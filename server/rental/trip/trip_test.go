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
	"testing"
)

func TestService_CreateTrip(t *testing.T) {
	ctx := context.Background()
	ctx = auth.ContextWithAccountID(ctx, "accountID1")
	mc, err := mongotesting.NewClient(ctx)
	if err != nil {
		t.Fatalf("cannot connect mongodb:%v", err)
	}

	m := dao.NewMongo(mc.Database("coolcar"))

	logger, err := server.NewZapLogger()
	if err != nil {
		fmt.Errorf("cannot new zap logger:%v", err)
	}
	req := &rentalpb.CreateTripReq{
		CarId: "car1",
		Start: &rentalpb.Location{
			Latitude:  32.123,
			Longitude: 114.2525,
		},
	}

	pm := &profileManager{}
	cm := &carManager{}
	poim := &poi.Manager{}
	s := &Service{
		ProfileManager: pm,
		Log:            logger,
		Mongo:          m,
		CarManager:     cm,
		POIManager:     poim,
	}
	pm.iID = "identity1"
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
			want:   "", // ??? TODO 明天测试完后可以引入
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
			want:         "",
		},
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
	return c.unlockErr
}
