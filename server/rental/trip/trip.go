package trip

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/rental/trip/dao"
	"coolcar/shared/auth"
	"coolcar/shared/id"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Service struct {
	Log *zap.Logger
	col *dao.Mongo
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
	accountID, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "")
	}
	trip, err := s.col.GetTrip(ctx, id.TripID(req.Id), accountID)
	if err != nil {
		return nil, err
	}

	if req.Current != nil {
		//TODO: 更新形成,计算价格
	}

	if req.GetEndTrip() {
		//TODO: 结束形成
	}
	s.col.UpdateTrip(ctx,)
}
