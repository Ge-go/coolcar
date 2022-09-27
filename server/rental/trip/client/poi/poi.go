package poi

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/shared/http"
)

type Manager struct {
}

//Resolve 引用腾讯云poi服务
func (m *Manager) Resolve(ctx context.Context, local *rentalpb.Location) (string, error) {
	// 引用tencent poi server
	localStr, err := http.TransformationLocal(ctx, local)
	if err != nil {
		return "", err
	}

	return localStr, nil
}
