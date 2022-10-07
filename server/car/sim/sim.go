package sim

import (
	"context"
	carpb "coolcar/car/api/gen/v1"
	"fmt"
	"go.uber.org/zap"
)

type Subscriber interface {
	Subscribe(ctx context.Context) (chan *carpb.CarEntity, error)
}

type Controller struct {
	Subscriber Subscriber

	CarService carpb.CarServiceClient
	Logger     zap.Logger
}

func (c *Controller) RunSimulations(ctx context.Context) error {
	res, err := c.CarService.GetCars(ctx, &carpb.GetCarsReq{})
	if err != nil {
		c.Logger.Error("cannot get cars", zap.Error(err))
	}

	msgCh, err := c.Subscriber.Subscribe(ctx)
	if err != nil {
		c.Logger.Error("cannot subscribe", zap.Error(err))
		return fmt.Errorf("cannot subscribe:%v", err)
	}

	// 把所有Cars丢入map  if cars too many , should be optimization map
	carChans := make(map[string]chan *carpb.Car)
	for _, car := range res.Cars {
		ch := make(chan *carpb.Car)
		carChans[car.Id] = ch
		// SimulateCar with car date
		go c.SimulateCar(context.Background(), car, ch)
	}

	for carUpdate := range msgCh {
		ch := carChans[carUpdate.Id] // 这里缺少后台添加汽车,没有动态更新此map
		// 对ch 做一个保护
		if ch != nil {
			ch <- carUpdate.Car
		}
	}

	return nil
}

func (c *Controller) SimulateCar(ctx context.Context, initial *carpb.CarEntity, ch chan *carpb.Car) {
	carID := initial.Id

	for update := range ch {
		if update.Status == carpb.CarStatus_UNLOCKING {
			_, err := c.CarService.UpdateCar(ctx, &carpb.UpdateCarReq{
				Id:     carID,
				Status: carpb.CarStatus_UNLOCKED,
			})
			if err != nil {
				c.Logger.Error("cannot unlock car", zap.Error(err))
			}
		} else if update.Status == carpb.CarStatus_LOCKING {
			_, err := c.CarService.UpdateCar(ctx, &carpb.UpdateCarReq{
				Id:     carID,
				Status: carpb.CarStatus_LOCKED,
			})
			if err != nil {
				c.Logger.Error("cannot lock car", zap.Error(err))
			}
		}
	}
}
