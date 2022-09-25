package dao

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	mongotesting "coolcar/shared/mongo/testing"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"os"
	"testing"
)

var mongoURI string

func TestMongo_ResolveAccountID(t *testing.T) {
	mongoURI = "mongodb://localhost:27017"
	ctx := context.Background()
	mc, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		t.Fatalf("cannot connect mongodb:%v", err)
	}

	m := NewMongo(mc.Database("coolcar"))

	tr, err := m.CreateTrip(ctx, &rentalpb.Trip{
		AccountId: "account1",
		CarId:     "car1",
		Start: &rentalpb.LocationStatus{
			PoiName: "startpoint",
			Location: &rentalpb.Location{
				Latitude:  30,
				Longitude: 120,
			},
		},
		End: &rentalpb.LocationStatus{
			PoiName:  "endpoint",
			FeeCent:  10000,
			KmDriven: 35,
			Location: &rentalpb.Location{
				Latitude:  35,
				Longitude: 115,
			},
		},
		Status: rentalpb.TripStatus_FINISHED,
	})
	if err != nil {
		t.Errorf("cannot create Trip:%v", err)
	}
	t.Errorf("%+v", tr)

	record, err := m.GetTrip(ctx, tr.ID.Hex(), "account1")
	if err != nil {
		t.Errorf("cannot get Trip:%v", err)
	}

	t.Errorf("%+v", record)
}

func TestMain(m *testing.M) {
	os.Exit(mongotesting.RunWithMongoInDocker(m, &mongoURI))
}
