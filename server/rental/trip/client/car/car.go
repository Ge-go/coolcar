package car

import (
	"context"
	"coolcar/shared/id"
)

// Manager for Car 后续与car 验证汽车是否与人在同一位置,以及开锁
type Manager struct {
}

func (m *Manager) Verify(ctx context.Context, cid id.CarID) error {
	return nil
}

func (m *Manager) Unlock(ctx context.Context, cid id.CarID) error {
	return nil
}
