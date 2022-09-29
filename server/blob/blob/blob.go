package blob

import (
	"context"
	blobpb "coolcar/blob/api/gen/v1"
	"coolcar/blob/blob/dao"
	"go.uber.org/zap"
)

type Service struct {
	Mongo  *dao.Mongo
	Logger *zap.Logger

	blobpb.UnsafeBlobServiceServer
}

func (s *Service) CreateBlob(ctx context.Context, req *blobpb.CreateBlobReq) (*blobpb.CreateBlobRsp, error) {
	panic("implement me")
}

func (s *Service) GetBlob(ctx context.Context, req *blobpb.GetBlobReq) (*blobpb.GetBlobRsp, error) {
	panic("implement me")
}

func (s *Service) GetBlobURL(ctx context.Context, req *blobpb.GetBlobURLReq) (*blobpb.GetBlobURLRsp, error) {
	panic("implement me")
}
