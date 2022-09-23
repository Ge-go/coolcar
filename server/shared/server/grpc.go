package server

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/rental/trip"
	"coolcar/shared/auth"
	"go.uber.org/zap"
	"google.golang.org/appengine/log"
	"google.golang.org/grpc"
	"net"
)

type GRPCConfig struct {
	RSAPublicKey string
}

func GRPCServer(config *GRPCConfig) error {
	logger, err := zap.NewDevelopment()
	if err != nil {
		panic(err.Error())
	}

	lis, err := net.Listen("tcp", ":8082")

	if config.RSAPublicKey != "" {
		interceptor, err := auth.Interceptor(config.RSAPublicKey)
		if err != nil {
			log.Errorf(context.Background(), "cannot interceptor:%v", err)
		}
	}

	s := grpc.NewServer(grpc.UnaryInterceptor(interceptor))

	rentalpb.RegisterTripServiceServer(s, &trip.Service{
		Log: logger,
	})

	s.Serve(lis)
}
