package main

import (
	"context"
	carpb "coolcar/car/api/gen/v1"
	"coolcar/car/car"
	"coolcar/car/dao"
	"coolcar/car/mq/amqpclt"
	"coolcar/car/sim"
	"coolcar/car/sim/pos"
	"coolcar/car/trip"
	"coolcar/car/ws"
	rentalpb "coolcar/rental/api/gen/v1"
	coolenvpb "coolcar/shared/coolenv"
	"coolcar/shared/server"
	"github.com/gorilla/websocket"
	"github.com/streadway/amqp"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"log"
	"net/http"
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

	posSub, err := amqpclt.NewSubscriber(amqpConn, "pos_sim", logger)
	if err != nil {
		logger.Fatal("cannot create pos subscriber", zap.Error(err))
	}

	// grpc 在dial的时候是不会去建立连接的,建立连接是在内部调用rpc方法时去走的
	carClient, err := grpc.Dial("localhost:8084", grpc.WithInsecure())
	if err != nil {
		logger.Fatal("cannot dial car service", zap.Error(err))
	}

	aiClient, err := grpc.Dial("localhost:18001", grpc.WithInsecure())
	if err != nil {
		logger.Fatal("cannot dial pos service", zap.Error(err))
	}

	simController := &sim.Controller{
		CarService:    carpb.NewCarServiceClient(carClient),
		CarSubscriber: sub,
		Logger:        logger,
		AIService:     coolenvpb.NewAIServiceClient(aiClient),
		PosSubscriber: &pos.Subscriber{
			Sub:    posSub,
			Logger: logger,
		},
	}

	// 模拟 汽车开关锁
	go simController.RunSimulations(context.Background())

	// start websocket handler
	http.HandleFunc("/ws", ws.Handler(
		&websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		},
		sub,
		logger,
	))
	go func() {
		addr := ":9090"
		logger.Info("HTTP server started.", zap.String("addr", addr))
		logger.Sugar().Fatal(http.ListenAndServe(addr, nil))
	}()

	// Start trip updater.
	tripConn, err := grpc.Dial("localhost:8082", grpc.WithInsecure())
	go trip.RunUpdater(sub, rentalpb.NewTripServiceClient(tripConn), logger)

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
