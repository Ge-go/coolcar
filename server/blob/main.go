package main

import (
	"context"
	blobpb "coolcar/blob/api/gen/v1"
	"coolcar/blob/blob"
	"coolcar/blob/blob/dao"
	"coolcar/shared/server"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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

	logger.Sugar().Fatal(server.GRPCServer(&server.GRPCConfig{
		Name:   "blob",
		Addr:   ":8083",
		Logger: logger,
		RegisterFunc: func(s *grpc.Server) {
			blobpb.RegisterBlobServiceServer(s, &blob.Service{
				Mongo:  dao.NewMongo(mgClient.Database("coolcar")),
				Logger: logger,
			})
		},
	}))
}