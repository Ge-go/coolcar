package main

import (
	authpb "coolcar/auth/api/gen/v1"
	"coolcar/auth/auth"
	"coolcar/auth/wechat"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"net"
)

func main() {
	logger, err := zap.NewDevelopment()
	if err != nil {
		panic(err.Error())
	}

	lis, err := net.Listen("tcp", ":8081")
	s := grpc.NewServer()
	authpb.RegisterAuthServiceServer(s, &auth.Service{
		Log: logger,
		ResolveOpenID: &wechat.Service{
			AppID:  "wx32e1737ca7ca35ee",
			Secret: "15edba49c62d8781f9a5c8a0f4d83025",
		},
	})

	s.Serve(lis)
}
