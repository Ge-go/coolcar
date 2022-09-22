package token

import (
	"crypto/rsa"
	"fmt"
	"github.com/dgrijalva/jwt-go"
)

type JWTTokenVerifier struct {
	PublicKey *rsa.PublicKey
}

func (v *JWTTokenVerifier) Verify(token string) (string, error) {
	t, err := jwt.ParseWithClaims(token, &jwt.StandardClaims{}, func(*jwt.Token) (interface{}, error) {
		return v.PublicKey, nil
	})

	if err != nil {
		return "", fmt.Errorf("cannot parse token: %v", err)
	}

	//token 验证通过
	if !t.Valid {
		return "", fmt.Errorf("token not valid")
	}

	//断言
	if clm, ok := t.Claims.(*jwt.StandardClaims); !ok {
		return "", fmt.Errorf("token claim is not StandardClaims")
	} else {
		if err = clm.Valid(); err != nil {
			return "", fmt.Errorf("claim not valid: %v", err)
		}
		return clm.Subject, nil
	}
}
