package main

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/rental/trip"
	"coolcar/shared/auth"
	"net"

	"go.uber.org/zap"
	"google.golang.org/appengine/log"
	"google.golang.org/grpc"
)

func main() {
	logger, err := zap.NewDevelopment()
	if err != nil {
		panic(err.Error())
	}

	lis, err := net.Listen("tcp", ":8082")

	interceptor, err := auth.Interceptor(publicKey)
	if err != nil {
		log.Errorf(context.Background(), "cannot interceptor:%v", err)
	}
	s := grpc.NewServer(grpc.UnaryInterceptor(interceptor))

	rentalpb.RegisterTripServiceServer(s, &trip.Service{
		Log: logger,
	})

	s.Serve(lis)
}

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqxFwNhX/uDuKAkaaOe9m
7LHtMIvlImZvPlI7kRpRi+wuyTEAY/XZ3+ThnUotBxhKV3N8gmXXWLKn5Y5vcHUm
N0jQW6d2Dn0qWZ+EBPOHdjA5HdqAnb3yxDq3S/tS20ARUm2Xyqx/+kGrVz/G/VHO
cV3Uaq06nIUGVs0oeOQTTLlVEGjNHFvp+Ou3QLZJHjt5SdPf0P2++0hOt5OWUTY+
n0kbTjYQyDf+VK7QkMpjPUCPgdS3BQ3wK6Mrpjrc9tQ7gtvIMMP4SWN8jPAwPUfy
zJEbnTX2lI5SEW7k9fzlaAsDIRJLK8W0kSzW2cd+1VlhUC4RynVwQ+ONaUs4OqyP
mwIDAQAB
-----END PUBLIC KEY-----`
