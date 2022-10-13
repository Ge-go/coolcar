package wechat

import (
	"fmt"
	"github.com/medivhzhan/weapp/v2"
)

type Service struct {
	AppID  string
	Secret string
}

// Resolve 通过code 获取openid
func (s *Service) Resolve(code string) (string, error) {
	loginRsp, err := weapp.Login(s.AppID, s.Secret, code)
	if err != nil {
		return "", fmt.Errorf("weapp.Login err:%v", err)
	}

	//响应错误也要处理
	if loginRsp.GetResponseError() != nil {
		return "", fmt.Errorf("weapp response err:%v", err)
	}

	return loginRsp.OpenID, nil
}
