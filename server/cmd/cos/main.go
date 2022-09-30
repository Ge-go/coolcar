package main

import (
	"context"
	blobpb "coolcar/blob/api/gen/v1"
	"fmt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	conn, err := grpc.Dial("localhost:8083", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		panic(err)
	}

	c := blobpb.NewBlobServiceClient(conn)
	//res, err := c.CreateBlob(context.Background(), &blobpb.CreateBlobReq{
	//	AccountId:           "accountWs",
	//	UploadUrlTimeoutSec: 1000,
	//})
	//if err != nil {
	//	panic(err)
	//}
	//res, err := c.GetBlob(context.Background(), &blobpb.GetBlobReq{
	//	Id: "6336a6fe2710f39b9a5764d8",
	//})

	res, err := c.GetBlobURL(context.Background(), &blobpb.GetBlobURLReq{
		Id:         "6336a6fe2710f39b9a5764d8",
		TimeoutSec: 100,
	})
	if err != nil {
		panic(err)
	}

	fmt.Printf("%+v\n", res)
}
