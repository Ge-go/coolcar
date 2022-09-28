package profile

import (
	"context"
	"coolcar/shared/id"
)

// Manager defines a profile manager.
type Manager struct {
}

// Verify verifies account identity. 后续与外部profile服务打交道  返回绑定业务IdentityID
func (p *Manager) Verify(ctx context.Context, aid id.AccountID) (id.Identity, error) {
	return "identity1", nil
}
