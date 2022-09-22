package auth

import (
	"context"
	authpb "coolcar/auth/api/gen/v1"
	"coolcar/auth/dao"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"time"
)

type Service struct {
	Log           *zap.Logger
	ResolveOpenID OpenIDResolver
	Mongo         *dao.Mongo
	GenerateToken TokenGenerator
	TokenExpire   time.Duration

	authpb.UnsafeAuthServiceServer
}

// OpenIDResolver resolves an authorization code
// get an OpenID
type OpenIDResolver interface {
	Resolve(code string) (string, error)
}

// TokenGenerator generates a token for the specified
type TokenGenerator interface {
	GenerateToken(accountID string, expire time.Duration) (string, error)
}

func (s *Service) Login(ctx context.Context, req *authpb.LoginReq) (*authpb.LoginRsp, error) {
	result, err := s.ResolveOpenID.Resolve(req.Code)
	if err != nil {
		return nil, status.Errorf(codes.Unavailable, "cannot resolveOpenID: %v", err)
	}

	accountID, err := s.Mongo.ResolveAccountID(ctx, result)
	if err != nil {
		s.Log.Error("cannot resolve account id:", zap.Error(err))
		return nil, status.Errorf(codes.Internal, "")
	}

	//accountID get Token
	token, err := s.GenerateToken.GenerateToken(accountID, s.TokenExpire)

	if err != nil {
		s.Log.Error("cannot generate token:", zap.Error(err))
		return nil, status.Errorf(codes.Internal, "")
	}

	s.Log.Info("generateToken is success:", zap.String("token is:", accountID))

	return &authpb.LoginRsp{
		AccessToken: token,
		ExpiresIn:   int32(s.TokenExpire),
	}, nil
}

//改变日志格式
func newZapLogger() (*zap.Logger, error) {
	cfg := zap.NewDevelopmentConfig()
	cfg.EncoderConfig.TimeKey = ""
	return cfg.Build()
}
