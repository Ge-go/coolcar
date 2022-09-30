package blob

import (
	"context"
	blobpb "coolcar/blob/api/gen/v1"
	"coolcar/blob/blob/dao"
	"coolcar/shared/id"
	"go.mongodb.org/mongo-driver/mongo"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"io"
	"io/ioutil"
	"net/http"
	"time"
)

// Storage defines cos get & SingURL
type Storage interface {
	SignURL(ctx context.Context, method, path string, timeout time.Duration) (string, error)
	Get(ctx context.Context, path string) (io.ReadCloser, error)
}

type Service struct {
	Storage Storage

	Mongo  *dao.Mongo
	Logger *zap.Logger

	blobpb.UnsafeBlobServiceServer
}

func (s *Service) CreateBlob(ctx context.Context, req *blobpb.CreateBlobReq) (*blobpb.CreateBlobRsp, error) {
	blob, err := s.Mongo.CreateBlob(ctx, id.AccountID(req.AccountId))
	if err != nil {
		s.Logger.Error("create blob err", zap.Error(err))
		return nil, status.Error(codes.Internal, "")
	}

	u, err := s.Storage.SignURL(ctx, http.MethodPut, blob.Path, secToDuration(req.UploadUrlTimeoutSec))
	if err != nil {
		return nil, status.Errorf(codes.Aborted, "cannot sign url:%v", err)
	}

	return &blobpb.CreateBlobRsp{
		Id:        blob.ID.Hex(),
		UploadUrl: u,
	}, nil
}

func (s *Service) GetBlob(ctx context.Context, req *blobpb.GetBlobReq) (*blobpb.GetBlobRsp, error) {
	br, err := s.getBlobRecord(ctx, id.BlobID(req.Id))
	if err != nil {
		return nil, err
	}

	r, err := s.Storage.Get(ctx, br.Path)
	if r != nil {
		defer r.Close()
	}
	if err != nil {
		return nil, status.Errorf(codes.Aborted, "cannot get storage:%v", err)
	}

	b, err := ioutil.ReadAll(r)
	if err != nil {
		return nil, status.Errorf(codes.Aborted, "cannot read from response:%v", err)
	}

	return &blobpb.GetBlobRsp{
		Data: b,
	}, nil
}

func (s *Service) GetBlobURL(ctx context.Context, req *blobpb.GetBlobURLReq) (*blobpb.GetBlobURLRsp, error) {
	br, err := s.getBlobRecord(ctx, id.BlobID(req.Id))
	if err != nil {
		return nil, err
	}

	url, err := s.Storage.SignURL(ctx, http.MethodGet, br.Path, secToDuration(req.TimeoutSec))
	if err != nil {
		return nil, status.Errorf(codes.Aborted, "cannot sign url:%v", err)
	}

	return &blobpb.GetBlobURLRsp{
		Url: url,
	}, nil
}

func (s *Service) getBlobRecord(ctx context.Context, id id.BlobID) (*dao.BlobRecord, error) {
	blob, err := s.Mongo.GetBlob(ctx, id)
	if err == mongo.ErrNoDocuments {
		return nil, status.Error(codes.NotFound, "")
	}

	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	return blob, err
}

func secToDuration(sec int32) time.Duration {
	return time.Duration(sec) * time.Second
}
