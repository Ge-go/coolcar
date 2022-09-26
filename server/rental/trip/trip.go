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
	ProfileManager ProfileManager
	Log            *zap.Logger
	Mongo          *dao.Mongo
}

// ProfileManager defines the ACL (Anti Corruption Layer)访问控制,防止领域入侵
// for profile verification logic.
type ProfileManager interface {
	Verify(context.Context, id.AccountID) (id.Identity, error)
}

func (s *Service) CreateTrip(ctx context.Context, req *rentalpb.CreateTripReq) (*rentalpb.TripEntity, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}
	//验证驾驶者身份
	iID, err := s.ProfileManager.Verify(ctx, aid)
	if err != nil {
		return nil, status.Error(codes.FailedPrecondition, err.Error())
	}
	//车辆开锁
	//创建形成,入库计费 (思考,这里如何做到一致性)

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
	trip, err := s.Mongo.GetTrip(ctx, id.TripID(req.Id), accountID)
	if err != nil {
		return nil, err
	}

	if req.Current != nil {
		//TODO: 更新形成,计算价格
	}

	if req.GetEndTrip() {
		//TODO: 结束形成
	}
	s.Mongo.UpdateTrip(ctx, id.TripID(req.Id), accountID, trip.UpdatedAt, trip.Trip)

	return nil, nil
}
