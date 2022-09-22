package token

import (
	"crypto/rsa"
	"github.com/dgrijalva/jwt-go"
	"time"
)

type JWTToken struct {
	issuer     string
	privateKey *rsa.PrivateKey
	nowFunc    func() time.Time
}

func NewJWTToken(issuer string, privateKey *rsa.PrivateKey) *JWTToken {
	return &JWTToken{
		issuer:     issuer,
		privateKey: privateKey,
		nowFunc:    time.Now,
	}
}

func (t *JWTToken) GenerateToken(accountID string, expire time.Duration) (string, error) {
	nowSec := t.nowFunc().Unix()
	tknNotSign := jwt.NewWithClaims(jwt.SigningMethodRS512, jwt.StandardClaims{
		Issuer:    t.issuer,
		IssuedAt:  nowSec,
		ExpiresAt: nowSec + int64(expire.Seconds()),
		Subject:   accountID,
	})

	return tknNotSign.SignedString(t.privateKey)
}
