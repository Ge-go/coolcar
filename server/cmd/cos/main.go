package main

import (
	"context"
	"fmt"
	"github.com/tencentyun/cos-go-sdk-v5"
	"net/http"
	"net/url"
	"time"
)

func main() {
	u, err := url.Parse("https://coolcar-1300439358.cos.ap-guangzhou.myqcloud.com")
	if err != nil {
		panic(err)
	}
	su, _ := url.Parse("https://cos.COS_REGION.myqcloud.com")
	b := &cos.BaseURL{BucketURL: u, ServiceURL: su}
	id := "AKIDPo0rcDdomX5PXTHuLZZNM7ex4zg9QVMz"
	key := "SwHPK2axCGAuVxCIDweCZllXAcrulQ1S"
	client := cos.NewClient(b, &http.Client{
		Transport: &cos.AuthorizationTransport{
			SecretID:  id,
			SecretKey: key,
		},
	})

	name := "imageCheck.png"
	presignedURL, err := client.Object.GetPresignedURL(context.Background(), http.MethodGet, name, id, key, 1*time.Hour, nil)
	if err != nil {
		panic(err)
	}
	fmt.Println(presignedURL)
}
