package profile

import (
	"context"
	blobpb "coolcar/blob/api/gen/v1"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/rental/profile/dao"
	"coolcar/shared/auth"
	"coolcar/shared/id"
	"go.mongodb.org/mongo-driver/mongo"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"time"
)

// Service impl profile service
type Service struct {
	BlobClient        blobpb.BlobServiceClient
	PhotoGetExpire    time.Duration
	PhotoCreateExpire time.Duration

	Mongo  *dao.Mongo
	Logger *zap.Logger

	rentalpb.UnsafeProfileServiceServer
}

func (s *Service) GetProfile(ctx context.Context, req *rentalpb.GetProfileReq) (*rentalpb.Profile, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}
	profile, err := s.Mongo.GetProfile(ctx, aid)
	if err != nil {
		code := s.logAndConvertProfileErr(err)
		if code == codes.NotFound {
			return &rentalpb.Profile{}, nil
		}

		return nil, status.Error(code, "")
	}

	if profile.Profile == nil {
		return &rentalpb.Profile{}, nil
	}

	return profile.Profile, nil
}

func (s *Service) SubmitProfile(ctx context.Context, req *rentalpb.Identity) (*rentalpb.Profile, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}

	p := &rentalpb.Profile{
		Identity:       req,
		IdentityStatus: rentalpb.IdentityStatus_PENDING,
	}
	err = s.Mongo.UpdateProfile(ctx, aid, rentalpb.IdentityStatus_UNSUBMITTED, p)
	if err != nil {
		s.Logger.Error("cannot update profile", zap.Error(err))
		return nil, status.Error(codes.Internal, "")
	}

	go func() {
		time.Sleep(3e9)
		err := s.Mongo.UpdateProfile(context.Background(), aid, rentalpb.IdentityStatus_PENDING, &rentalpb.Profile{
			Identity:       req,
			IdentityStatus: rentalpb.IdentityStatus_VERIFIED,
		})
		if err != nil {
			s.Logger.Error("cannot verify identity", zap.Error(err))
		}
	}()

	return p, nil
}

func (s *Service) ClearProfile(ctx context.Context, req *rentalpb.ClearProfileReq) (*rentalpb.Profile, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}

	//置空
	p := &rentalpb.Profile{}
	err = s.Mongo.UpdateProfile(ctx, aid, rentalpb.IdentityStatus_VERIFIED, p)
	if err != nil {
		s.Logger.Error("cannot update profile", zap.Error(err))
		return nil, status.Error(codes.Internal, "")
	}
	return p, nil
}

func (s *Service) GetProfilePhoto(ctx context.Context, req *rentalpb.GetProfilePhotoReq) (*rentalpb.GetProfilePhotoRsp, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}

	pr, err := s.Mongo.GetProfile(ctx, aid)

	if err != nil {
		return nil, status.Error(s.logAndConvertProfileErr(err), "")
	}

	if pr.PhotoBlobID == "" {
		return nil, status.Error(codes.NotFound, "")
	}

	br, err := s.BlobClient.GetBlobURL(ctx, &blobpb.GetBlobURLReq{
		Id:         pr.PhotoBlobID,
		TimeoutSec: int32(s.PhotoGetExpire.Seconds()),
	})
	if err != nil {
		s.Logger.Error("cannot get blob", zap.Error(err))
		return nil, status.Error(codes.Internal, "")
	}

	return &rentalpb.GetProfilePhotoRsp{
		Url: br.Url,
	}, nil
}

func (s *Service) CreateProfilePhoto(ctx context.Context, req *rentalpb.CreateProfilePhotoReq) (*rentalpb.CreateProfilePhotoRsp, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}

	// 这里两层业务再次无法做到一致性
	// create blob
	blob, err := s.BlobClient.CreateBlob(ctx, &blobpb.CreateBlobReq{
		AccountId:           aid.String(),
		UploadUrlTimeoutSec: int32(s.PhotoCreateExpire.Seconds()),
	})

	if err != nil {
		s.Logger.Error("cannot create blob", zap.Error(err))
		return nil, status.Error(codes.Internal, "")
	}

	// update blob id
	err = s.Mongo.UpdateProfilePhoto(ctx, aid, id.BlobID(blob.Id))
	if err != nil {
		s.Logger.Error("cannot UpdateProfilePhoto", zap.Error(err))
		return nil, status.Error(codes.Internal, "")
	}

	return &rentalpb.CreateProfilePhotoRsp{
		UploadUrl: blob.UploadUrl,
	}, nil
}

func (s *Service) CompleteProfilePhoto(ctx context.Context, req *rentalpb.CompleteProfilePhotoReq) (*rentalpb.Identity, error) {
	//aid, err := auth.AccountIDFromContext(ctx)
	//if err != nil {
	//	return nil, err
	//}

	return nil, nil
}

func (s *Service) logAndConvertProfileErr(err error) codes.Code {
	if err == mongo.ErrNoDocuments {
		return codes.NotFound
	}

	s.Logger.Error("cannot get profile", zap.Error(err))

	return codes.Internal
}
