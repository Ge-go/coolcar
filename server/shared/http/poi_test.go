package http

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"fmt"
	"testing"
)

func TestTransformationLocal(t *testing.T) {
	local, err := TransformationLocal(context.Background(), &rentalpb.Location{
		Latitude:  28.7033487,
		Longitude: 115.8660847,
	})
	if err != nil {
		t.Fatalf("cannot get local:%v", err)
	}

	fmt.Println(local)
}
