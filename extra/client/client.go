package main

import (
	"context"
	trippb "coolcar/proto/gen/go"
	"fmt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"log"
)

func main() {
	//client
	//grpc.WithTransportCredentials(insecure.NewCredentials())  引入安全连接
	conn, err := grpc.Dial("localhost:8081", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("cannot connect server: %v", err)
	}

	tsClient := trippb.NewTripServiceClient(conn)
	r, err := tsClient.GetTrip(context.Background(), &trippb.GetTripReq{Id: "trip456"})
	if err != nil {
		log.Fatalf("cannot call GetTrip:%v", err)
	}

	fmt.Println(r)
}
