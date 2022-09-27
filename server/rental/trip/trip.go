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
	CarManager     CarManager
	POIManager     POIManager

	rentalpb.UnimplementedTripServiceServer
}

// ProfileManager defines the ACL (Anti Corruption Layer)访问控制,防止领域入侵
// for profile verification logic.
type ProfileManager interface {
	Verify(context.Context, id.AccountID) (id.Identity, error)
}

// CarManager defines the ACL for car management
type CarManager interface {
	Verify(context.Context, id.CarID) error
	Unlock(context.Context, id.CarID) error
}

// POIManager resolves POI
type POIManager interface {
	Resolve(context.Context, *rentalpb.Location) (string, error)
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

	//检查车辆状态
	carID := id.CarID(req.CarId)
	if err = s.CarManager.Verify(ctx, carID); err != nil {
		return nil, status.Error(codes.FailedPrecondition, err.Error())
	}

	//根据传入的Location坐标,识别出一个具体地址
	poi, err := s.POIManager.Resolve(ctx, req.Start)
	if err != nil {
		s.Log.Info("cannot resolve poi", zap.Stringer("location", req.Start), zap.Error(err))
	}

	ls := &rentalpb.LocationStatus{
		Location: req.Start,
		PoiName:  poi,
	}
	//创建行程,入库计费 (思考,这里如何做到一致性)
	tr, err := s.Mongo.CreateTrip(ctx, &rentalpb.Trip{
		AccountId:  aid.String(),
		CarId:      carID.String(),
		IdentityId: iID.String(),
		Start:      ls,
		Current:    ls,
		Status:     rentalpb.TripStatus_IN_PROGRESS,
	})
	if err != nil {
		s.Log.Warn("cannot create trip", zap.Error(err))
		return nil, status.Error(codes.AlreadyExists, "")
	}

	//车辆开锁
	go func() {
		//新起一个服务
		err := s.CarManager.Unlock(context.Background(), carID)
		if err != nil {
			//这里在真实环境是否需要多一个上报需求
			s.Log.Error("cannot unlock car", zap.Error(err))
		}
	}()

	return &rentalpb.TripEntity{
		Id:   tr.ID.Hex(),
		Trip: tr.Trip,
	}, nil
}

func (s *Service) GetTrip(ctx context.Context, req *rentalpb.GetTripReq) (*rentalpb.Trip, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}

	trip, err := s.Mongo.GetTrip(ctx, id.TripID(req.Id), aid)
	if err != nil {
		return nil, status.Error(codes.NotFound, "")
	}

	return trip.Trip, nil
}

func (s *Service) GetTrips(ctx context.Context, req *rentalpb.GetTripsReq) (*rentalpb.GetTripsRsp, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}

	trips, err := s.Mongo.GetTrips(ctx, aid, req.Status)
	if err != nil {
		s.Log.Error("cannot get trips.", zap.Error(err))
		return nil, status.Error(codes.Internal, "")
	}

	res := &rentalpb.GetTripsRsp{}
	for _, tr := range trips {
		res.Trips = append(res.Trips, &rentalpb.TripEntity{
			Id:   tr.ID.Hex(),
			Trip: tr.Trip,
		})
	}

	return res, nil
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
