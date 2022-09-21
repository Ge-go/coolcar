package dao

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"testing"
)

func TestMongo_ResolveAccountID(t *testing.T) {
	ctx := context.Background()
	mc, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://121.37.232.8:27019/coolcar?readPreference=primary&ssl=false"))
	if err != nil {
		t.Fatalf("cannot connect mongodb:%v", err)
	}

	m := NewMongo(mc.Database("coolcar"))
	id, err := m.ResolveAccountID(ctx, "123")
	if err != nil {
		t.Errorf("faild resolve account id for 123:%v", err)
	} else {
		want := "632b15a3c9a624e11223a592"
		if id != want {
			t.Errorf("resolve account id: want:%q,got:%q", want, id)
		}
	}
}
