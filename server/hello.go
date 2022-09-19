package main

import (
	trippb "coolcar/proto/gen/go"
	"encoding/json"
	"fmt"

	"google.golang.org/protobuf/proto"
)

func main() {
	//零值
	var a int
	fmt.Println(a) //0

	trip := trippb.Trip{
		Start:       "abc",
		End:         "def",
		DurationSec: 3600,
		FeeCent:     10000,
	}
	//fmt.Println(&trip)
	data, err := proto.Marshal(&trip) //生成二进制流
	if err != nil {
		fmt.Println(err.Error())
	}

	fmt.Printf("%X\n", data)

	var trip2 trippb.Trip
	err = proto.Unmarshal(data, &trip2)
	if err != nil {
		panic(err.Error())
	}

	fmt.Println(&trip2)

	data, err = json.Marshal(&trip2)

	if err != nil {
		panic(err.Error())
	}

	fmt.Println(string(data))
}
