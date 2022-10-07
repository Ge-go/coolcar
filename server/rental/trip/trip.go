package trip

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/rental/trip/dao"
	"coolcar/shared/auth"
	"coolcar/shared/id"
	"coolcar/shared/mongo/objid"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"math/rand"
	"time"
)

type Service struct {
	ProfileManager ProfileManager
	Log            *zap.Logger
	Mongo          *dao.Mongo
	CarManager     CarManager
	POIManager     POIManager

	rentalpb.UnsafeTripServiceServer
}

// ProfileManager defines the ACL (Anti Corruption Layer)访问控制,防止领域入侵
// for profile verification logic.
type ProfileManager interface {
	Verify(context.Context, id.AccountID) (id.Identity, error)
}

// CarManager defines the ACL for car management
type CarManager interface {
	Verify(context.Context, id.CarID, *rentalpb.Location) error
	Unlock(ctx context.Context, cid id.CarID, aid id.AccountID, tid id.TripID, avatarURL string) error
	Lock(ctx context.Context, cid id.CarID) error
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

	//TODO 引入validate.proto组件
	if req.CarId == "" || req.Start == nil {
		return nil, status.Error(codes.InvalidArgument, "")
	}

	//验证驾驶者身份
	iID, err := s.ProfileManager.Verify(ctx, aid)
	if err != nil {
		return nil, status.Error(codes.FailedPrecondition, err.Error())
	}

	//检查车辆状态
	carID := id.CarID(req.CarId)
	if err = s.CarManager.Verify(ctx, carID, nil); err != nil {
		return nil, status.Error(codes.FailedPrecondition, err.Error())
	}

	//获取初始位置信息
	ls := s.calcCurrentStatus(ctx, &rentalpb.LocationStatus{
		Location:     req.Start,
		TimestampSec: nowFunc(),
	}, req.Start)

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
		err := s.CarManager.Unlock(context.Background(), carID, aid, objid.ToTripID(tr.ID), req.AvatarUrl)
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
		return nil, err
	}
	trip, err := s.Mongo.GetTrip(ctx, id.TripID(req.Id), accountID)
	if err != nil {
		return nil, status.Error(codes.NotFound, "")
	}

	if trip.Trip.Current == nil {
		s.Log.Error("trip with out current set", zap.String("id", trip.ID.Hex()))
		return nil, status.Error(codes.Internal, "")
	}

	cur := trip.Trip.Current.Location
	if req.Current != nil {
		//更新行程
		cur = req.Current
	}

	trip.Trip.Current = s.calcCurrentStatus(ctx, trip.Trip.Current, cur)

	if req.GetEndTrip() {
		//结束行程
		trip.Trip.End = trip.Trip.Current
		trip.Trip.Status = rentalpb.TripStatus_FINISHED

		err = s.CarManager.Lock(ctx, id.CarID(trip.Trip.CarId))
		if err != nil {
			return nil, status.Errorf(codes.FailedPrecondition, "cannot unlock car:%v", err)
		}
	}
	err = s.Mongo.UpdateTrip(ctx, id.TripID(req.Id), accountID, trip.UpdatedAt, trip.Trip)
	if err != nil {
		s.Log.Error("update trip error.", zap.String("update error id", req.Id), zap.Error(err))
		return nil, status.Error(codes.Aborted, "")
	}

	return trip.Trip, nil
}

var nowFunc = func() int64 {
	return time.Now().Unix()
}

const (
	centsPerSec = 0.7
	kmPerSec    = 0.02
)

//识别地址服务
func (s *Service) calcCurrentStatus(ctx context.Context, last *rentalpb.LocationStatus, cur *rentalpb.Location) *rentalpb.LocationStatus {
	now := nowFunc()
	elapsedSec := float64(now - last.TimestampSec)

	//根据传入的Location坐标,识别出一个具体地址
	poi, err := s.POIManager.Resolve(ctx, cur)
	if err != nil {
		s.Log.Info("cannot resolve poi", zap.Stringer("location", cur), zap.Error(err))
	}

	return &rentalpb.LocationStatus{
		Location:     cur,
		FeeCent:      last.FeeCent + int32(centsPerSec*elapsedSec*2*rand.Float64()),
		KmDriven:     last.KmDriven + kmPerSec*elapsedSec*2*rand.Float64(),
		TimestampSec: now,
		PoiName:      poi,
	}
}
