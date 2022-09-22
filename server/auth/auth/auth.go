package auth

import (
	"context"
	authpb "coolcar/auth/api/gen/v1"
	"coolcar/auth/dao"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Service struct {
	Log           *zap.Logger
	ResolveOpenID OpenIDResolver
	Mongo         *dao.Mongo

	authpb.UnsafeAuthServiceServer
}

// OpenIDResolver resolves an authorization code
// get an OpenID
type OpenIDResolver interface {
	Resolve(code string) (string, error)
}

func (s *Service) Login(ctx context.Context, req *authpb.LoginReq) (*authpb.LoginRsp, error) {
	result, err := s.ResolveOpenID.Resolve(req.Code)
	if err != nil {
		return nil, status.Errorf(codes.Unavailable, "cannot resolveOpenID: %v", err)
	}

	accountID, err := s.Mongo.ResolveAccountID(ctx, result)
	if err != nil {
		s.Log.Error("cannot resolve account id:", zap.Error(err))
	}

	s.Log.Info("received code", zap.String("account id code:", accountID))

	return &authpb.LoginRsp{
		AccessToken: "token for account id:" + accountID,
		ExpiresIn:   7200,
	}, nil
}

//改变日志格式
func newZapLogger() (*zap.Logger, error) {
	cfg := zap.NewDevelopmentConfig()
	cfg.EncoderConfig.TimeKey = ""
	return cfg.Build()
}
