package profile

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/shared/id"
	"encoding/base64"
	"fmt"
	"google.golang.org/protobuf/proto"
)

// Fetcher for trip verify to connect profile server
// 连接两个服务的模块,引入接口,防ACL
// 同框架下,微服务直接通信就好,如果不同框下,引入RPC调用
type Fetcher interface {
	GetProfile(ctx context.Context, req *rentalpb.GetProfileReq) (*rentalpb.Profile, error)
}

// Manager defines a profile manager.
type Manager struct {
	Fetcher Fetcher
}

// Verify verifies account identity. 后续与外部profile服务打交道  返回绑定业务IdentityID
func (m *Manager) Verify(ctx context.Context, aid id.AccountID) (id.Identity, error) {
	nilID := id.Identity("")

	p, err := m.Fetcher.GetProfile(ctx, &rentalpb.GetProfileReq{})
	if err != nil {
		return nilID, fmt.Errorf("cannot get profile:%v", err)
	}

	//驾驶者必须是验证过驾驶证的才能开车
	if p.IdentityStatus != rentalpb.IdentityStatus_VERIFIED {
		return nilID, fmt.Errorf("invalid identity status")
	}

	// 转出一个唯一iID  identity -> protoMarshal -> base64
	b, err := proto.Marshal(p.Identity)
	if err != nil {
		return nilID, fmt.Errorf("cannot marshal identity:%v", err)
	}

	return id.Identity(base64.StdEncoding.EncodeToString(b)), nil
}
