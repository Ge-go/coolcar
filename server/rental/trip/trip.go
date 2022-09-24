package trip

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"go.uber.org/zap"
)

type Service struct {
	Log *zap.Logger
}

func (s *Service) CreateTrip(ctx context.Context, req *rentalpb.CreateTripReq) (*rentalpb.TripEntity, error) {
	panic("implement me")
}

func (s *Service) GetTrip(ctx context.Context, req *rentalpb.GetTripReq) (*rentalpb.Trip, error) {
	panic("implement me")
}

func (s *Service) GetTrips(ctx context.Context, req *rentalpb.GetTripsReq) (*rentalpb.GetTripsRsp, error) {
	panic("implement me")
}

func (s *Service) UpdateTrip(ctx context.Context, req *rentalpb.UpdateTripReq) (*rentalpb.Trip, error) {
	panic("implement me")
}
