package trip

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/rental/trip/client/poi"
	"coolcar/rental/trip/dao"
	"coolcar/shared/auth"
	"coolcar/shared/id"
	mgo "coolcar/shared/mongo"
	mongotesting "coolcar/shared/mongo/testing"
	"coolcar/shared/server"
	"encoding/json"
	"fmt"
	"os"
	"testing"
)

// 测试创建行程服务
func TestService_CreateTrip(t *testing.T) {
	ctx := context.Background()
	ctx = auth.ContextWithAccountID(ctx, "accountID1")
	pm := &profileManager{}
	pm.iID = "accountID1Car"
	cm := &carManager{}
	s := newService(ctx, t, pm, cm)
	req := &rentalpb.CreateTripReq{
		CarId: "car1",
		Start: &rentalpb.Location{
			Latitude:  32.123,
			Longitude: 114.2525,
		},
	}

	gold := "{\"account_id\":\"accountID1\",\"car_id\":\"car1\",\"start\":{\"location\":{\"latitude\":32.123,\"longitude\":114.2525},\"poi_name\":\"河南省信阳市平桥区\",\"timestamp_sec\":10000},\"current\":{\"location\":{\"latitude\":32.123,\"longitude\":114.2525},\"poi_name\":\"河南省信阳市平桥区\",\"timestamp_sec\":10000},\"status\":1,\"identity_id\":\"accountID1Car\"}"
	cases := []struct {
		name         string
		tripID       string
		profileErr   error
		carVerifyErr error
		carUnlockErr error
		want         string
		wantErr      bool
	}{
		{
			name:   "normal_create",
			tripID: "5f8132eb12714bf629489054",
			want:   gold, // ??? TODO 明天测试完后可以引入
		},
		{
			name:       "profile_err",
			tripID:     "5f8132eb12714bf629489055",
			profileErr: fmt.Errorf("profile"),
			wantErr:    true,
		},
		{
			name:       "car_verify_err",
			tripID:     "5f8132eb12714bf629489056",
			profileErr: fmt.Errorf("verify"),
			wantErr:    true,
		},
		{
			name:         "car_unlock_err",
			tripID:       "5f8132eb12714bf629489057",
			carUnlockErr: fmt.Errorf("unlock"),
			want:         gold,
		},
	}

	// 用于测试固定
	nowFunc = func() int64 {
		return 10000
	}

	for _, cs := range cases {
		t.Run(cs.name, func(t *testing.T) {
			mgo.NewObjIDWithValue(id.TripID(cs.tripID))

			pm.err = cs.profileErr
			cm.unlockErr = cs.carUnlockErr
			cm.verifyErr = cs.carVerifyErr
			res, err := s.CreateTrip(ctx, req)
			if cs.wantErr {
				if err == nil {
					t.Errorf("want error;but got none")
				} else {
					return
				}
			}

			if err != nil {
				t.Errorf("error creating trip:%v", err)
			}

			if res.Id != cs.tripID {
				t.Errorf("incorrect id; want %q,got %q", cs.tripID, res.Id)
			}
			b, err := json.Marshal(res.Trip)
			if err != nil {
				t.Errorf("cannot marshal resp:%v", err)
			}

			got := string(b)
			if cs.want != got {
				t.Errorf("incorrect resp: want %q,got %q", cs.want, got)
			}
		})
	}
}

// 测试行程服务整个流程 create -> update -> finished -> get
func Test_TripProcess(t *testing.T) {
	ctx := auth.ContextWithAccountID(context.Background(), "account1")
	pm := &profileManager{iID: "identity1"}
	cm := &carManager{}
	s := newService(ctx, t, pm, cm)

	nowFunc = func() int64 {
		return 10000
	}

	req := &rentalpb.CreateTripReq{
		CarId: "car1",
		Start: &rentalpb.Location{
			Latitude:  32.123,
			Longitude: 114.2525,
		},
	}

	mgo.NewObjIDWithValue(id.TripID("5f8135eb12714bf629489056"))

	//完成测试后gold data
	createWant := `{"account_id":"account1","car_id":"car1","start":{"location":{"latitude":32.123,"longitude":114.2525},"poi_name":"河南省信阳市平桥区","timestamp_sec":10000},"current":{"location":{"latitude":32.123,"longitude":114.2525},"poi_name":"河南省信阳市平桥区","timestamp_sec":10000},"status":1,"identity_id":"identity1"}`
	updateWant := `{"account_id":"account1","car_id":"car1","start":{"location":{"latitude":32.123,"longitude":114.2525},"poi_name":"河南省信阳市平桥区","timestamp_sec":10000},"current":{"location":{"latitude":32.223,"longitude":114.3525},"poi_name":"河南省信阳市罗山县","timestamp_sec":10000},"status":1,"identity_id":"identity1"}`
	finishedWant := `{"account_id":"account1","car_id":"car1","start":{"location":{"latitude":32.123,"longitude":114.2525},"poi_name":"河南省信阳市平桥区","timestamp_sec":10000},"current":{"location":{"latitude":32.323,"longitude":114.4525},"poi_name":"河南省驻马店市正阳县","timestamp_sec":10000},"end":{"location":{"latitude":32.323,"longitude":114.4525},"poi_name":"河南省驻马店市正阳县","timestamp_sec":10000},"status":2,"identity_id":"identity1"}`
	getWant := `{"account_id":"account1","car_id":"car1","start":{"location":{"latitude":32.123,"longitude":114.2525},"poi_name":"河南省信阳市平桥区","timestamp_sec":10000},"current":{"location":{"latitude":32.323,"longitude":114.4525},"poi_name":"河南省驻马店市正阳县","timestamp_sec":10000},"end":{"location":{"latitude":32.323,"longitude":114.4525},"poi_name":"河南省驻马店市正阳县","timestamp_sec":10000},"status":2,"identity_id":"identity1"}`
	//测试用例
	cases := []struct {
		name string
		now  int64
		op   func() (*rentalpb.Trip, error)
		want string
	}{
		{
			name: "createTrip",
			now:  10000,
			op: func() (*rentalpb.Trip, error) {
				trip, err := s.CreateTrip(ctx, req)
				if err != nil {
					t.Errorf("cannot Create trip:%v", err)
				}
				return trip.Trip, nil
			},
			want: createWant,
		},
		{
			name: "updateTrip",
			now:  20000,
			op: func() (*rentalpb.Trip, error) {
				return s.UpdateTrip(ctx, &rentalpb.UpdateTripReq{
					Id: "5f8135eb12714bf629489056",
					Current: &rentalpb.Location{
						Latitude:  32.223,
						Longitude: 114.3525,
					},
				})
			},
			want: updateWant,
		},
		{
			name: "finishedTrip",
			now:  30000,
			op: func() (*rentalpb.Trip, error) {
				return s.UpdateTrip(ctx, &rentalpb.UpdateTripReq{
					Id: "5f8135eb12714bf629489056",
					Current: &rentalpb.Location{
						Latitude:  32.323,
						Longitude: 114.4525,
					},
					EndTrip: true,
				})
			},
			want: finishedWant,
		},
		{
			name: "getTrip",
			now:  40000,
			op: func() (*rentalpb.Trip, error) {
				return s.GetTrip(ctx, &rentalpb.GetTripReq{
					Id: "5f8135eb12714bf629489056",
				})
			},
			want: getWant,
		},
	}

	// start test
	for _, cs := range cases {
		fmt.Printf("start test:%v\n", cs.name)
		trip, err := cs.op()
		if err != nil {
			t.Fatalf("%v :: cs.op err:%v\n", cs.name, err)
		}
		jsonData, err := json.Marshal(trip)
		if err != nil {
			t.Errorf("json Marshal err:%v", err)
		}

		if string(jsonData) != cs.want {
			t.Errorf("%v::i'v want %v;but got %v;", cs.name, cs.want, string(jsonData))
		}
	}
}

func newService(ctx context.Context, t *testing.T, pm ProfileManager, cm CarManager) *Service {
	mc, err := mongotesting.NewClient(ctx)
	if err != nil {
		t.Fatalf("cannot connect mongodb:%v", err)
	}

	m := dao.NewMongo(mc.Database("coolcar"))

	logger, err := server.NewZapLogger()
	if err != nil {
		fmt.Errorf("cannot new zap logger:%v", err)
	}

	poim := &poi.Manager{}
	s := &Service{
		ProfileManager: pm,
		Log:            logger,
		Mongo:          m,
		CarManager:     cm,
		POIManager:     poim,
	}

	return s
}

type profileManager struct {
	iID id.Identity
	err error
}

func (p *profileManager) Verify(ctx context.Context, id id.AccountID) (id.Identity, error) {
	return p.iID, p.err
}

type carManager struct {
	unlockErr error
	verifyErr error
}

func (c *carManager) Verify(ctx context.Context, id id.CarID) error {
	return c.verifyErr
}

func (c *carManager) Unlock(ctx context.Context, id id.CarID) error {
	return nil
}

func TestMain(m *testing.M) {
	os.Exit(mongotesting.RunWithMongoInDocker(m))
}
