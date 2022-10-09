package auth

import (
	"context"
	"coolcar/shared/auth/token"
	"coolcar/shared/id"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
	"strings"
)

const (
	ImpersonateAccountHeader = "impersonate-account-id"
	authHeader               = "authorization"
	prefixKey                = "Bearer "
)

// Interceptor create a auth interceptor
func Interceptor(publicKey string) (grpc.UnaryServerInterceptor, error) {
	pem, err := jwt.ParseRSAPublicKeyFromPEM([]byte(publicKey))
	if err != nil {
		return nil, fmt.Errorf("cannot parse public key:%v", err)
	}

	i := &interceptor{
		&token.JWTTokenVerifier{PublicKey: pem},
	}

	return i.HandleReq, nil
}

//引入实现
type tokenVerifier interface {
	Verify(token string) (string, error)
}

type interceptor struct {
	verifier tokenVerifier
}

func (i *interceptor) HandleReq(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (resp interface{}, err error) {
	// 这里的动作如何保证不危险
	// 唯一方法,不能对外保留这个header
	aid := impersonationFromContext(ctx)
	if aid != "" {
		fmt.Printf("impersonation %q\n", aid)
		return handler(ContextWithAccountID(ctx, id.AccountID(aid)), req)
	}

	// not get tokenWithCtx
	token, err := tokenFromCtx(ctx)
	if err != nil {
		return nil, status.Error(codes.Unauthenticated, "")
	}

	accountID, err := i.verifier.Verify(token)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "cannot verify token:%v", err)
	}

	return handler(ContextWithAccountID(ctx, id.AccountID(accountID)), req)
}

// 过滤特殊头部信息
func impersonationFromContext(ctx context.Context) string {
	m, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return ""
	}

	imp := m[ImpersonateAccountHeader]
	if len(imp) == 0 {
		return ""
	}
	return imp[0]
}

// hide accountID
type accountIDKey struct {
}

// ContextWithAccountID carry aid to req
func ContextWithAccountID(ctx context.Context, aid id.AccountID) context.Context {
	return context.WithValue(ctx, accountIDKey{}, aid)
}

// get token from context
func tokenFromCtx(ctx context.Context) (string, error) {
	unauthenticated := status.Error(codes.Unauthenticated, "")
	m, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return "", unauthenticated
	}

	token := ""
	for _, v := range m[authHeader] {
		if strings.HasPrefix(v, prefixKey) {
			token = v[len(prefixKey):]
		}
	}
	if token == "" {
		return "", unauthenticated
	}

	return token, nil
}

// AccountIDFromContext gets account id from context
// Returns unauthenticated error if no account id is available
func AccountIDFromContext(ctx context.Context) (id.AccountID, error) {
	v := ctx.Value(accountIDKey{})
	aid, ok := v.(id.AccountID)
	if !ok {
		return "", status.Error(codes.Unauthenticated, "")
	}

	return aid, nil
}
