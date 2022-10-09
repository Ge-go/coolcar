package main

import (
	"context"
	authpb "coolcar/auth/api/gen/v1"
	carpb "coolcar/car/api/gen/v1"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/shared/auth"
	"coolcar/shared/server"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/encoding/protojson"
	"log"
	"net/http"
	"net/textproto"
)

//启动gateWay服务
func main() {
	logger, err := server.NewZapLogger()
	if err != nil {
		log.Fatalf("cannot create zap logger:%v", err)
	}
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
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
	), runtime.WithIncomingHeaderMatcher(func(key string) (string, bool) {
		//过滤坏请求
		// CanonicalMIMEHeaderKey -后面的首字母转换成大写
		if key == textproto.CanonicalMIMEHeaderKey(runtime.MetadataHeaderPrefix+auth.ImpersonateAccountHeader) {
			//false 我要扔掉这个头部信息
			return "", false
		}
		return runtime.DefaultHeaderMatcher(key)
	}))

	serverConfig := []struct {
		name         string
		addr         string
		registerFunc func(ctx context.Context, mux *runtime.ServeMux, endpoint string, opts []grpc.DialOption) (err error)
	}{
		{
			name:         "auth",
			addr:         "localhost:8081",
			registerFunc: authpb.RegisterAuthServiceHandlerFromEndpoint,
		},
		{
			name:         "trip",
			addr:         "localhost:8082",
			registerFunc: rentalpb.RegisterTripServiceHandlerFromEndpoint,
		},
		{
			name:         "profile",
			addr:         "localhost:8082",
			registerFunc: rentalpb.RegisterProfileServiceHandlerFromEndpoint,
		},
		{
			name:         "car",
			addr:         "localhost:8084",
			registerFunc: carpb.RegisterCarServiceHandlerFromEndpoint,
		},
	}

	for _, v := range serverConfig {
		err := v.registerFunc(ctx, mux, v.addr, []grpc.DialOption{grpc.WithInsecure()})
		if err != nil {
			logger.Sugar().Fatalf("cannot register auth service: %v", err)
		}
	}

	addr := ":8080"
	logger.Sugar().Infof("grpc gateway started at %s", addr)

	logger.Sugar().Fatal(http.ListenAndServe(addr, mux))
}
