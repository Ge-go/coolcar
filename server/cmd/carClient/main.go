package main

import (
	"context"
	carpb "coolcar/car/api/gen/v1"
	"fmt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"log"
)

func main() {
	dial, err := grpc.Dial("localhost:8084", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("grpc dial err:%v", err)
	}

	carClient := carpb.NewCarServiceClient(dial)

	for i := 0; i < 5; i++ {
		res, err := carClient.CreateCar(context.Background(), &carpb.CreateCarReq{})
		if err != nil {
			panic(err)
		}
		fmt.Printf("careated car %s\n", res.Id)
	}
}
