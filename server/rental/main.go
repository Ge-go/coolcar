package main

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
MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQB0/VvBMMCh5r7KRjx6DhN+
wOM4IQLMb12X+scFjQmt59VGiTovUP+mUrHjl0YnJ+H9bnYMWCxX1UAD83kCH49w
j4wBSAIYott5NkrWvzxkMCIMYXCAMOZs6ZgKam7e1U5U/ntFEguBcv3OsByXNHCZ
lmlwxhi/cGIAZhTFc0BcKsbc16wjw+6vj5re4VsSu+BoIHiBL38BNR5vCzjW1H0X
JG2KMbYdNJVd41oMS1Xi9rJ4AZHx3B7lrjP01ghg6eY0cz9L4EBtTg1MPgH2N/OT
Q9iLeH00UygXy/q1PY5ktulgm6Q21g9HhTdz/csVhq4hTrG7ONttBUTr19G4oHCD
AgMBAAE=
-----END PUBLIC KEY-----`
