package main

import (
	"context"
	authpb "coolcar/auth/api/gen/v1"
	"coolcar/auth/auth"
	"coolcar/auth/dao"
	"coolcar/auth/wechat"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"log"
	"net"
)

func main() {
	logger, err := zap.NewDevelopment()
	if err != nil {
		panic(err.Error())
	}

	lis, err := net.Listen("tcp", ":8081")
	s := grpc.NewServer()

	mgClient, err := mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://121.37.232.8:27019/coolcar?readPreference=primary&ssl=false"))
	if err != nil {
		log.Fatalf("cannot connect mongo:%v", err)
	}

	authpb.RegisterAuthServiceServer(s, &auth.Service{
		Log: logger,
		ResolveOpenID: &wechat.Service{
			AppID:  "wx32e1737ca7ca35ee",
			Secret: "15edba49c62d8781f9a5c8a0f4d83025",
		},
		Mongo: dao.NewMongo(mgClient.Database("coolcar")),
	})

	s.Serve(lis)
}
