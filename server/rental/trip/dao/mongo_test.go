package dao

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/shared/id"
	mgo "coolcar/shared/mongo"
	"coolcar/shared/mongo/objid"
	mongotesting "coolcar/shared/mongo/testing"
	"github.com/google/go-cmp/cmp"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"google.golang.org/protobuf/testing/protocmp"
	"os"
	"testing"
)

func TestMongo_CreateTrip(t *testing.T) {
	ctx := context.Background()
	mgCli, err := mongotesting.NewClient(ctx)
	if err != nil {
		t.Fatalf("cannot connect mongodb:%v", err)
	}

	db := mgCli.Database("coolcar")
	err = mongotesting.SetupIndex(ctx, db)
	if err != nil {
		t.Fatalf("cannot SetupIndex to mongo:%v", err)
	}

	mgWithColl := NewMongo(db)

	cases := []struct {
		name       string
		tripId     string
		accountID  string
		tripStatus rentalpb.TripStatus
		wantErr    bool
	}{
		{
			name:       "finished",
			tripId:     "63314f683667369ed78eccb3",
			accountID:  "account1",
			tripStatus: rentalpb.TripStatus_FINISHED,
		},
		{
			name:       "another_finished",
			tripId:     "63314f683667369ed78eccb4",
			accountID:  "account1",
			tripStatus: rentalpb.TripStatus_FINISHED,
		},
		{
			name:       "process",
			tripId:     "63314f683667369ed78eccb5",
			accountID:  "account1",
			tripStatus: rentalpb.TripStatus_IN_PROGRESS,
		},
		{
			name:       "another_process",
			tripId:     "63314f683667369ed78eccb6",
			accountID:  "account1",
			tripStatus: rentalpb.TripStatus_IN_PROGRESS,
			wantErr:    true,
		},
		{
			// another user is success
			name:       "another_user_process",
			tripId:     "63314f683667369ed78eccb7",
			accountID:  "account2",
			tripStatus: rentalpb.TripStatus_IN_PROGRESS,
		},
	}

	for _, cs := range cases {
		mgo.NewObjIDWithValue(id.TripID(cs.tripId))
		_, err := mgWithColl.CreateTrip(ctx, &rentalpb.Trip{
			AccountId: cs.accountID,
			Status:    cs.tripStatus,
		})
		if cs.wantErr {
			if err == nil {
				t.Errorf("%s:error expected;got none", cs.name)
			}
			continue
		}
		if err != nil {
			t.Errorf("%s:error creating tr:%v", cs.name, err)
			continue
		}
	}
}

func TestMongo_GetTrip(t *testing.T) {
	ctx := context.Background()
	mc, err := mongotesting.NewClient(ctx)
	if err != nil {
		t.Fatalf("cannot connect mongodb:%v", err)
	}

	m := NewMongo(mc.Database("coolcar"))
	acctID := id.AccountID("account1")
	mgo.NewObjID = primitive.NewObjectID

	tr, err := m.CreateTrip(ctx, &rentalpb.Trip{
		AccountId: acctID.String(),
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
		t.Fatalf("cannot create Trip:%v", err)
	}

	record, err := m.GetTrip(ctx, objid.ToTripID(tr.ID), acctID)
	if err != nil {
		t.Errorf("cannot get Trip:%v", err)
	}

	if diff := cmp.Diff(tr, record, protocmp.Transform()); diff != "" {
		t.Errorf("result differs;-want +got:%s", diff)
	}
}

func TestMongo_GetTrips(t *testing.T) {
	ctx := context.Background()
	mc, err := mongotesting.NewClient(ctx)
	if err != nil {
		t.Fatalf("cannot connect mongodb:%v", err)
	}

	rows := []struct {
		id        string
		accountID string
		status    rentalpb.TripStatus
	}{
		{
			id:        "63314f683607369ed78eccb3",
			accountID: "account_id_for_get_trips",
			status:    rentalpb.TripStatus_IN_PROGRESS,
		},
		{
			id:        "63314f683607369ed78eccb4",
			accountID: "account_id_for_get_trips",
			status:    rentalpb.TripStatus_FINISHED,
		},
		{
			id:        "63314f683607369ed78eccb5",
			accountID: "account_id_for_get_trips",
			status:    rentalpb.TripStatus_TS_NOT_SPECIFIED,
		},
		{
			id:        "63314f683607369ed78eccb6",
			accountID: "account_id_for_get_trips",
			status:    rentalpb.TripStatus_FINISHED,
		},
		{
			id:        "63314f683607369ed78eccb7",
			accountID: "account_id_for_get_trip",
			status:    rentalpb.TripStatus_IN_PROGRESS,
		},
	}
	m := NewMongo(mc.Database("coolcar"))

	for _, v := range rows {
		mgo.NewObjIDWithValue(id.TripID(v.id))
		_, err = m.CreateTrip(ctx, &rentalpb.Trip{
			AccountId: v.accountID,
			Status:    v.status,
		})
		if err != nil {
			t.Fatalf("cannot CreateTrip for test get trips:%v", err)
		}
	}

	//准备测试数据
	cases := []struct {
		name      string
		accountid string
		status    rentalpb.TripStatus
		wantCount int
		wantID    string
	}{
		{
			name:      "get_trips_all",
			accountid: "account_id_for_get_trips",
			wantCount: 4,
		},
		{
			name:      "get_trip_with_status",
			accountid: "account_id_for_get_trip",
			wantCount: 1,
			status:    rentalpb.TripStatus_IN_PROGRESS,
			wantID:    "63314f683607369ed78eccb7",
		},
	}

	// start test with test data
	for _, cs := range cases {
		t.Run(cs.name, func(t *testing.T) {
			trips, err := m.GetTrips(ctx, id.AccountID(cs.accountid), cs.status)
			if err != nil {
				t.Errorf("cannot get trips:%v", err)
			}
			if cs.wantCount != len(trips) {
				t.Error("get trips list len is not enough")
			}
			if cs.wantCount == 1 && len(trips) > 1 {
				if cs.wantID != trips[0].ID.Hex() {
					t.Errorf("i'v wantid:%v;but got:%v", cs.wantID, trips[0].ID.Hex())
				}
			}
		})
	}
}

func TestMongo_UpdateTrip(t *testing.T) {
	ctx := context.Background()
	mc, err := mongotesting.NewClient(ctx)
	if err != nil {
		t.Fatalf("cannot connect mongodb:%v", err)
	}

	m := NewMongo(mc.Database("coolcar"))
	tid := id.TripID("63314f684807369ed78eccb7")
	aid := id.AccountID("account_for_update")

	//模拟时间,用于触发乐观锁
	var now int64 = 10000
	mgo.NewObjIDWithValue(tid)
	mgo.UpdatedAt = func() int64 {
		return now
	}

	tr, err := m.CreateTrip(ctx, &rentalpb.Trip{
		AccountId: aid.String(),
		Status:    rentalpb.TripStatus_IN_PROGRESS,
		Start: &rentalpb.LocationStatus{
			PoiName: "start_poi",
		},
	})
	if err != nil {
		t.Fatalf("cannot create trip :%v", err)
	}

	if tr.UpdatedAt != 10000 {
		t.Fatalf("updatedat time is err:%v", err)
	}

	cases := []struct {
		name          string
		now           int64
		withUpdatedAt int64
		wantErr       bool
	}{
		{
			name:          "trip_update_one",
			now:           20000,
			withUpdatedAt: 10000,
		},
		{
			//引起冲突项
			name:          "trip_update_BF",
			now:           30000,
			withUpdatedAt: 10000,
			wantErr:       true,
		},
		{
			name:          "trip_update_retry",
			now:           30000,
			withUpdatedAt: 20000,
		},
	}

	update := &rentalpb.Trip{
		AccountId: aid.String(),
		Status:    rentalpb.TripStatus_IN_PROGRESS,
		Start: &rentalpb.LocationStatus{
			PoiName: "start_poi",
		},
	}

	for _, v := range cases {
		err = m.UpdateTrip(ctx, tid, aid, v.withUpdatedAt, update)
		if v.wantErr {
			if err == nil {
				t.Errorf("%s:I'v want:%v;but got:%v", v.name, v.wantErr, err)
			} else {
				continue
			}
		} else {
			if err != nil {
				t.Errorf("%s:cannot update trip:%v", v.name, err)
			}
		}
		updateTrip, err := m.GetTrip(ctx, tid, aid)
		if err != nil {
			t.Errorf("%s:cannot got trip after update:%v", v.name, err)
		}

		if v.now != updateTrip.UpdatedAt {
			t.Errorf("%s:i'v want updateat %v;but got updateat %v", v.name, v.now, updateTrip.UpdatedAt)
		}
	}
}

func TestMain(m *testing.M) {
	os.Exit(mongotesting.RunWithMongoInDocker(m))
}
