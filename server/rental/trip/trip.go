package trip

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/shared/auth"
	"go.uber.org/zap"
)

type Service struct {
	Log *zap.Logger
	rentalpb.UnimplementedTripServiceServer
}

func (s *Service) CreateTrip(ctx context.Context, req *rentalpb.CreateTripReq) (*rentalpb.CreateTripRsp, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}
	s.Log.Info("is in createTrip", zap.String("token to accountId ", aid.String()))
	return &rentalpb.CreateTripRsp{}, nil
}
