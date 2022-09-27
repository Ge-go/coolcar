package http

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"fmt"
	"testing"
)

func TestTransformationLocal(t *testing.T) {
	local, err := TransformationLocal(context.Background(), &rentalpb.Location{
		Latitude:  22.55329,
		Longitude: 113.88308,
	})
	if err != nil {
		t.Fatalf("cannot get local:%v", err)
	}

	fmt.Println(local)
}
