package car

import (
	"context"
	carpb "coolcar/car/api/gen/v1"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/shared/id"
	"fmt"
)

// Manager for Car 后续与car 验证汽车是否与人在同一位置,以及开锁
type Manager struct {
	CarService carpb.CarServiceClient
}

func (m *Manager) Verify(ctx context.Context, cid id.CarID, loc *rentalpb.Location) error {
	car, err := m.CarService.GetCar(ctx, &carpb.GetCarReq{
		Id: cid.String(),
	})

	if err != nil {
		return fmt.Errorf("cannot get car: %v", err)
	}

	// Locked 才能开锁
	if car.Status != carpb.CarStatus_LOCKED {
		return fmt.Errorf("cannot unlock; car status is %v", car.Status)
	}

	return nil
}

func (m *Manager) Unlock(ctx context.Context, cid id.CarID, aid id.AccountID, tid id.TripID, avatarURL string) error {
	_, err := m.CarService.UnlockCar(ctx, &carpb.UnlockCarReq{
		Id: cid.String(),
		Driver: &carpb.Driver{
			Id:        aid.String(),
			AvatarUrl: avatarURL,
		},
		TripId: tid.String(),
	})

	if err != nil {
		return fmt.Errorf("cannot UnlockCar:%v", err)
	}

	return nil
}

func (m *Manager) Lock(ctx context.Context, cid id.CarID) error {
	_, err := m.CarService.LockCar(ctx, &carpb.LockCarReq{
		Id: cid.String(),
	})

	if err != nil {
		return fmt.Errorf("cannot lock car:%v", err)
	}

	return nil
}
