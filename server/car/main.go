package main

import (
	"context"
	"coolcar/car/amqpclt"
	carpb "coolcar/car/api/gen/v1"
	"coolcar/car/car"
	"coolcar/car/dao"
	"coolcar/car/sim"
	"coolcar/shared/server"
	"github.com/streadway/amqp"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"log"
)

func main() {
	logger, err := server.NewZapLogger()
	if err != nil {
		panic(err.Error())
	}

	mgClient, err := mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://121.37.232.8:27019/coolcar?readPreference=primary&ssl=false"))
	if err != nil {
		log.Fatalf("cannot connect mongo:%v", err)
	}

	carMgo := dao.NewMongo(mgClient.Database("coolcar"))

	amqpConn, err := amqp.Dial("amqp://guest:guest@121.37.232.8:5672/")
	if err != nil {
		logger.Fatal("cannot dial amqp", zap.Error(err))
	}

	pub, err := amqpclt.NewPublisher(amqpConn, "coolcar")
	if err != nil {
		logger.Fatal("cannot create publisher", zap.Error(err))
	}

	sub, err := amqpclt.NewSubscriber(amqpConn, "coolcar", logger)
	if err != nil {
		logger.Fatal("cannot create subscriber", zap.Error(err))
	}

	// grpc 在dial的时候是不会去建立连接的,建立连接是在内部调用rpc方法时去走的
	carClient, err := grpc.Dial("localhost:8084", grpc.WithInsecure())
	if err != nil {
		logger.Fatal("cannot dial car service", zap.Error(err))
	}

	simController := &sim.Controller{
		CarService: carpb.NewCarServiceClient(carClient),
		Subscriber: sub,
		Logger:     logger,
	}

	go simController.RunSimulations(context.Background())

	logger.Sugar().Fatal(server.GRPCServer(&server.GRPCConfig{
		Name:   "car",
		Addr:   ":8084",
		Logger: logger,
		RegisterFunc: func(s *grpc.Server) {
			carpb.RegisterCarServiceServer(s, &car.Service{
				Logger:    logger,
				Mongo:     carMgo,
				Publisher: pub,
			})
		},
	}))
}
