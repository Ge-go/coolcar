package trip

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/rental/trip/client/poi"
	"coolcar/rental/trip/dao"
	"coolcar/shared/id"
	mongotesting "coolcar/shared/mongo/testing"
	"coolcar/shared/server"
	"fmt"
	"testing"
)

func TestService_CreateTrip(t *testing.T) {
	ctx := context.Background()
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

	s := &Service{
		ProfileManager: &profileManager{},
		Log:            logger,
		Mongo:          m,
		CarManager:     &carManager{},
		POIManager:     &poi.Manager{},
	}
	s.ProfileManager
}

type profileManager struct {
	iID id.Identity
	err error
}

func (p *profileManager) Verify(ctx context.Context, id id.AccountID) (id.Identity, error) {
	return p.iID, p.err
}

type carManager struct {
	err error
}

func (c *carManager) Verify(ctx context.Context, id id.CarID) error {
	return c.err
}

func (c *carManager) Unlock(ctx context.Context, id id.CarID) error {
	return c.err
}
