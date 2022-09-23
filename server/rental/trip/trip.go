package trip

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"go.uber.org/zap"
)

type Service struct {
	Log *zap.Logger
	rentalpb.UnimplementedTripServiceServer
}

func (s *Service) CreateTrip(ctx context.Context, req *rentalpb.CreateTripReq) (*rentalpb.TripServiceRsp, error) {
	s.Log.Info("is in createTrip")
	return &rentalpb.TripServiceRsp{}, nil
}
