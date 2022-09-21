PROTO_APTH=./auth/api
GO_OUT_PATH=./auth/api/gen/v1
mkdir -p $GO_OUT_PATH

#go grpc,pb,grpcGateway生成方案
protoc -I=$PROTO_APTH --go_out=paths=source_relative:$GO_OUT_PATH $PROTO_APTH/auth.proto
protoc -I=$PROTO_APTH --go-grpc_out=paths=source_relative:$GO_OUT_PATH $PROTO_APTH/auth.proto
protoc -I=$PROTO_APTH --grpc-gateway_out=paths=source_relative,grpc_api_configuration=$PROTO_APTH/auth.yaml:$GO_OUT_PATH $PROTO_APTH/auth.proto

PBTS_BIN_DIR=../wx/miniprogram/node_modules/.bin
PBTS_OUT_DIR=../wx/miniprogram/service/proto_gen/auth
mkdir -p $PBTS_OUT_DIR

#生成js,ts方案
$PBTS_BIN_DIR/pbjs -t static -w es6 $PROTO_APTH/auth.proto --no-create --no-encode --no-dncode --no-verify --no-delimited -o $PBTS_OUT_DIR/auth_pb_tmp.js
echo 'import * as $protobuf from "protobufjs";' >$PBTS_OUT_DIR/auth_pb.js
cat $PBTS_OUT_DIR/auth_pb_tmp.js >>$PBTS_OUT_DIR/auth_pb.js
rm $PBTS_OUT_DIR/auth_pb_tmp.js

$PBTS_BIN_DIR/pbts -o $PBTS_OUT_DIR/auth_pb.d.ts $PBTS_OUT_DIR/auth_pb.js
