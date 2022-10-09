package sim

import (
	"context"
	carpb "coolcar/car/api/gen/v1"
	"coolcar/car/mq"
	coolenvpb "coolcar/shared/coolenv"
	"fmt"
	"go.uber.org/zap"
	"time"
)

// PosSubscriber Simulation 模拟汽车移动服务
type PosSubscriber interface {
	Subscribe(ctx context.Context) (ch chan *coolenvpb.CarPosUpdate, cleanUp func(), err error)
}

type Controller struct {
	CarSubscriber mq.Subscriber
	AIService     coolenvpb.AIServiceClient
	PosSubscriber PosSubscriber

	CarService carpb.CarServiceClient
	Logger     *zap.Logger
}

func (c *Controller) RunSimulations(ctx context.Context) error {
	var cars []*carpb.CarEntity
	for {
		time.Sleep(3e9)
		res, err := c.CarService.GetCars(ctx, &carpb.GetCarsReq{})
		if err != nil {
			c.Logger.Error("cannot get cars", zap.Error(err))
		}
		cars = res.Cars
		break
	}

	c.Logger.Info("Running car Simulations.", zap.Int("car_count", len(cars)))

	// msgCh 用于订阅开关锁服务进行上下文传输
	// posCh 用于汽车定位服务数据进行传输
	msgCh, cleanUp, err := c.CarSubscriber.Subscribe(ctx)
	defer cleanUp()
	if err != nil {
		c.Logger.Error("cannot subscribe", zap.Error(err))
		return fmt.Errorf("cannot subscribe car:%v", err)
	}

	posChan, posCleanUp, err := c.PosSubscriber.Subscribe(ctx)
	defer posCleanUp()
	if err != nil {
		c.Logger.Error("cannot subscribe pos", zap.Error(err))
		return fmt.Errorf("cannot subscribe pos:%v", err)
	}

	// 把所有Cars丢入map  if cars too many , should be optimization map
	carChans := make(map[string]chan *carpb.Car)
	posChans := make(map[string]chan *carpb.Location)
	for _, car := range cars {
		carCh := make(chan *carpb.Car)
		carChans[car.Id] = carCh
		posFanoutCh := make(chan *carpb.Location)
		posChans[car.Id] = posFanoutCh
		// SimulateCar with car date
		go c.SimulateCar(context.Background(), car, carCh, posFanoutCh)
	}

	for {
		select {
		case carUpdate := <-msgCh:
			ch := carChans[carUpdate.Id] // 这里缺少后台添加汽车,没有动态更新此map
			// 对ch 做一个保护
			if ch != nil {
				ch <- carUpdate.Car
			}
		case posUpdate := <-posChan:
			ch := posChans[posUpdate.CarId]
			// 对ch 做一个保护
			if ch != nil {
				ch <- &carpb.Location{
					Latitude:  posUpdate.Pos.Latitude,
					Longitude: posUpdate.Pos.Longitude,
				}
			}
		}
	}

	return nil
}

func (c *Controller) SimulateCar(ctx context.Context, initial *carpb.CarEntity, carCh chan *carpb.Car, posCh chan *carpb.Location) {
	car := initial
	c.Logger.Info("Simulating car.", zap.String("id", car.Id))

	for {
		select {
		case update := <-carCh:
			if update.Status == carpb.CarStatus_UNLOCKING {
				updated, err := c.unlockCar(ctx, car)
				if err != nil {
					c.Logger.Error("cannot unlock Car", zap.Error(err))
					break
				}
				car = updated
			} else if update.Status == carpb.CarStatus_LOCKING {
				updated, err := c.lockCar(ctx, car)
				if err != nil {
					c.Logger.Error("cannot lock car", zap.Error(err))
					break
				}
				car = updated
			}
		case pos := <-posCh:
			updated, err := c.moveCar(ctx, car, pos)
			if err != nil {
				c.Logger.Error("cannot move car", zap.Error(err))
				break
			}
			car = updated
		}
	}
}

func (c *Controller) lockCar(ctx context.Context, car *carpb.CarEntity) (*carpb.CarEntity, error) {
	// 我说状态变更
	car.Car.Status = carpb.CarStatus_LOCKED

	_, err := c.CarService.UpdateCar(ctx, &carpb.UpdateCarReq{
		Id:     car.Id,
		Status: carpb.CarStatus_LOCKED,
	})
	if err != nil {
		return nil, fmt.Errorf("cannot update car state:%v", err)
	}

	_, err = c.AIService.EndSimulateCarPos(ctx, &coolenvpb.EndSimulateCarPosRequest{
		CarId: car.Id,
	})
	if err != nil {
		return nil, fmt.Errorf("cannot end simulate:%v", err)
	}

	return car, nil
}

func (c *Controller) unlockCar(ctx context.Context, car *carpb.CarEntity) (*carpb.CarEntity, error) {
	// 我说状态变更
	// 我说开锁了才是开锁了,现有开锁,再有入库
	car.Car.Status = carpb.CarStatus_UNLOCKED

	_, err := c.CarService.UpdateCar(ctx, &carpb.UpdateCarReq{
		Id:     car.Id,
		Status: carpb.CarStatus_UNLOCKED,
	})
	if err != nil {
		return nil, fmt.Errorf("cannot unlock car:%v", err)
	}

	//移动
	_, err = c.AIService.SimulateCarPos(ctx, &coolenvpb.SimulateCarPosRequest{
		CarId: car.Id,
		InitialPos: &coolenvpb.Location{
			Latitude:  car.Car.Position.Latitude,
			Longitude: car.Car.Position.Longitude,
		},
		Type: coolenvpb.PosType_RANDOM,
	})

	if err != nil {
		return nil, fmt.Errorf("cannot simulate car pos:%v", err)
	}

	return car, nil
}

func (c *Controller) moveCar(ctx context.Context, car *carpb.CarEntity, pos *carpb.Location) (*carpb.CarEntity, error) {
	car.Car.Position = pos
	_, err := c.CarService.UpdateCar(ctx, &carpb.UpdateCarReq{
		Id:       car.Id,
		Position: pos,
	})
	if err != nil {
		return nil, fmt.Errorf("cannot update car: %v", err)
	}

	return car, nil
}
