package cos

import (
	"context"
	"fmt"
	"github.com/tencentyun/cos-go-sdk-v5"
	"io"
	"net/http"
	"net/url"
	"time"
)

type Service struct {
	Sid    string
	SKey   string
	client *cos.Client
}

// SignURL to upload & get cos
func (s *Service) SignURL(ctx context.Context, method, path string, timeout time.Duration) (string, error) {
	u, err := s.client.Object.GetPresignedURL(ctx, method, path, s.Sid, s.SKey, timeout, nil)
	if err != nil {
		return "", fmt.Errorf("cannot getpresignedURL:%v", err)
	}

	return u.String(), nil
}

func (s *Service) Get(ctx context.Context, path string) (io.ReadCloser, error) {
	res, err := s.client.Object.Get(ctx, path, nil)

	var b io.ReadCloser

	if res != nil {
		b = res.Body
	}

	if err != nil {
		return b, err
	}

	if res.StatusCode >= 400 { //internal error
		return b, fmt.Errorf("got err response:%+v", res)
	}

	return b, nil
}

// NewService get cos client
// the secID secKey we need secrecy
func NewService(addr, secID, secKey string) (*Service, error) {
	u, err := url.Parse(addr)
	if err != nil {
		return nil, fmt.Errorf("cannot parse cos url:%v", err)
	}

	b := &cos.BaseURL{BucketURL: u}
	client := cos.NewClient(b, &http.Client{
		Transport: &cos.AuthorizationTransport{
			SecretID:  secID,
			SecretKey: secKey,
		},
	})

	return &Service{
		Sid:    secID,
		SKey:   secKey,
		client: client,
	}, nil
}
