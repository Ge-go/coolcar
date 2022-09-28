function genProto() {
  serviceURI=$1
  PROTO_APTH=./${serviceURI}/api
  GO_OUT_PATH=./${serviceURI}/api/gen/v1
  mkdir -p $GO_OUT_PATH

  #go grpc,pb,grpcGateway生成方案
  protoc -I=$PROTO_APTH --go_out=paths=source_relative:$GO_OUT_PATH $PROTO_APTH/${serviceURI}.proto
  protoc -I=$PROTO_APTH --go-grpc_out=paths=source_relative:$GO_OUT_PATH $PROTO_APTH/${serviceURI}.proto
  protoc -I=$PROTO_APTH --grpc-gateway_out=paths=source_relative,grpc_api_configuration=$PROTO_APTH/${serviceURI}.yaml:$GO_OUT_PATH $PROTO_APTH/${serviceURI}.proto

  PBTS_BIN_DIR=../wx/miniprogram/node_modules/.bin
  PBTS_OUT_DIR=../wx/miniprogram/service/proto_gen/${serviceURI}
  mkdir -p $PBTS_OUT_DIR

  #生成js,ts方案
  $PBTS_BIN_DIR/pbjs -t static -w es6 $PROTO_APTH/${serviceURI}.proto --no-create --no-encode --no-dncode --no-verify --no-delimited --force-number -o $PBTS_OUT_DIR/${serviceURI}_pb_tmp.js
  echo 'import * as $protobuf from "protobufjs";' >$PBTS_OUT_DIR/${serviceURI}_pb.js
  cat $PBTS_OUT_DIR/${serviceURI}_pb_tmp.js >>$PBTS_OUT_DIR/${serviceURI}_pb.js
  rm $PBTS_OUT_DIR/${serviceURI}_pb_tmp.js

  $PBTS_BIN_DIR/pbts -o $PBTS_OUT_DIR/${serviceURI}_pb.d.ts $PBTS_OUT_DIR/${serviceURI}_pb.js
}

genProto auth
genProto rental
