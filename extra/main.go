package main

import (
	"context"
	trippb "coolcar/proto/gen/go"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/encoding/protojson"
	"log"
	"net"
	"net/http"
)

type Service struct {
	trippb.UnsafeTripServiceServer
}

func (*Service) GetTrip(ctx context.Context, req *trippb.GetTripReq) (*trippb.GetTripRsp, error) {
	return &trippb.GetTripRsp{
		Id: req.GetId(),
		Trip: &trippb.Trip{
			DurationSec: 1780,
			Start:       "123",
			StartPos: &trippb.Location{
				Latitude:  123,
				Longitude: 456,
			},
			PathPos: []*trippb.Location{
				{Longitude: 123, Latitude: 456},
				{Longitude: 123, Latitude: 456},
			},
			FeeCent: 123,
			Status:  trippb.TripStatus_IN_PROGRESS,
		},
	}, nil
}

func main() {
	//零值
	//var a int
	//fmt.Println(a) //0
	//
	//trip := trippb.Trip{
	//	Start:       "abc",
	//	End:         "def",
	//	DurationSec: 3600,
	//	FeeCent:     10000,
	//}
	////fmt.Println(&trip)
	//data, err := proto.Marshal(&trip) //生成二进制流
	//if err != nil {
	//	fmt.Println(err.Error())
	//}
	//
	//fmt.Printf("%X\n", data)
	//
	//var trip2 trippb.Trip
	//err = proto.Unmarshal(data, &trip2)
	//if err != nil {
	//	panic(err.Error())
	//}
	//
	//fmt.Println(&trip2)
	//
	//data, err = json.Marshal(&trip2)
	//
	//if err != nil {
	//	panic(err.Error())
	//}
	//
	//fmt.Println(string(data))
	log.SetFlags(log.Lshortfile)

	//携带gateway对外暴露服务
	go startGRPCGateway()

	//server
	lis, err := net.Listen("tcp", ":8081")
	if err != nil {
		log.Fatalf("failed to listen:%v", err)
	}

	s := grpc.NewServer()
	trippb.RegisterTripServiceServer(s, &Service{})

	log.Fatal(s.Serve(lis))
}

//引入grpcGateWay对外暴露接口
func startGRPCGateway() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel() //运行完结果,cancel掉ctx
	mux := runtime.NewServeMux(runtime.WithMarshalerOption(
		runtime.MIMEWildcard,
		&runtime.JSONPb{
			MarshalOptions: protojson.MarshalOptions{
				UseEnumNumbers: true, // 枚举字段的值使用数字
				UseProtoNames:  true, // false使用字段为驼峰命名,生成下划线名称
			},
			UnmarshalOptions: protojson.UnmarshalOptions{
				DiscardUnknown: true, // 忽略 client 发送的不存在的 poroto 字段
			},
		},
	))
	err := trippb.RegisterTripServiceHandlerFromEndpoint(
		ctx,
		mux,
		"localhost:8081",
		[]grpc.DialOption{grpc.WithInsecure()},
	)
	if err != nil {
		log.Fatalf("cannot start grpc gateway:%v", err)
	}

	err = http.ListenAndServe(":8080", mux)
	if err != nil {
		log.Fatalf("cannot http.ListenAndServe:%v", err)
	}
}
