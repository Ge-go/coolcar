package server

import (
	"context"
	"coolcar/shared/auth"
	"go.uber.org/zap"
	"google.golang.org/appengine/log"
	"google.golang.org/grpc"
	"net"
)

type GRPCConfig struct {
	RSAPublicKey string
	Name         string
	Addr         string
	Logger       *zap.Logger
	RegisterFunc func(server *grpc.Server)
}

func GRPCServer(config *GRPCConfig) error {
	nameField := zap.String("name", config.Name)

	lis, err := net.Listen("tcp", config.Addr)

	if err != nil {
		config.Logger.Fatal("cannot listen ", nameField, zap.Error(err))
	}

	var opts []grpc.ServerOption
	if config.RSAPublicKey != "" {
		interceptor, err := auth.Interceptor(config.RSAPublicKey)
		if err != nil {
			log.Errorf(context.Background(), "cannot interceptor:%v", err)
		}
		opts = append(opts, grpc.UnaryInterceptor(interceptor))
	}

	s := grpc.NewServer(opts...)

	config.RegisterFunc(s)

	config.Logger.Info("server started ", nameField, zap.String("addr", config.Addr))

	return s.Serve(lis)
}
