package main

import (
	"context"
	authpb "coolcar/auth/api/gen/v1"
	"coolcar/auth/auth"
	"coolcar/auth/dao"
	"coolcar/auth/token"
	"coolcar/auth/wechat"
	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"log"
	"net"
	"time"
)

func main() {
	logger, err := zap.NewDevelopment()
	if err != nil {
		panic(err.Error())
	}

	lis, err := net.Listen("tcp", ":8081")
	s := grpc.NewServer()

	mgClient, err := mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://121.37.232.8:27019/coolcar?readPreference=primary&ssl=false"))
	if err != nil {
		log.Fatalf("cannot connect mongo:%v", err)
	}

	prvKey, err := jwt.ParseRSAPrivateKeyFromPEM([]byte(PrivateKey))
	if err != nil {
		log.Fatalf("cantnot parse RSA prvKey:%v", err)
	}

	authpb.RegisterAuthServiceServer(s, &auth.Service{
		Log: logger,
		ResolveOpenID: &wechat.Service{
			AppID:  "wx32e1737ca7ca35ee",
			Secret: "15edba49c62d8781f9a5c8a0f4d83025",
		},
		Mongo:         dao.NewMongo(mgClient.Database("coolcar")),
		GenerateToken: token.NewJWTToken("coolcar/auth", prvKey),
		TokenExpire:   2 * time.Hour,
	})

	s.Serve(lis)
}

const PrivateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAqxFwNhX/uDuKAkaaOe9m7LHtMIvlImZvPlI7kRpRi+wuyTEA
Y/XZ3+ThnUotBxhKV3N8gmXXWLKn5Y5vcHUmN0jQW6d2Dn0qWZ+EBPOHdjA5HdqA
nb3yxDq3S/tS20ARUm2Xyqx/+kGrVz/G/VHOcV3Uaq06nIUGVs0oeOQTTLlVEGjN
HFvp+Ou3QLZJHjt5SdPf0P2++0hOt5OWUTY+n0kbTjYQyDf+VK7QkMpjPUCPgdS3
BQ3wK6Mrpjrc9tQ7gtvIMMP4SWN8jPAwPUfyzJEbnTX2lI5SEW7k9fzlaAsDIRJL
K8W0kSzW2cd+1VlhUC4RynVwQ+ONaUs4OqyPmwIDAQABAoIBAAnD1BDyToeYtncM
yq718H0gZva3dZvyFvWKwiW1R+Rh1gXcCzapiQdTzGErI8jc5Rl62SekYpeIkzby
W4Ai38yWFna053NKR8mX5nRV5myjsg73MxJODnaPF3l53i/vx01aPijukduaNgqj
9FrveYZVIdP5EXhvy33W9jF4a3WcosTZBaY9hiiHYw8fy/0d7vl+KL2aq1tZFCt5
EFfX16p3/YNOWQFZb4L1O2KVlRhJcWfDcvqf5vpwcSO/RQ13jzgRmayuWCGKy63X
DlblpBkaDLSf8e9EBKSuzAZofdzD0uT+mARZl7FGmX7LOtlnDRvq3qbtRlYd8plz
chjaT+ECgYEA3dE/oy8IRagbMysJ88/dgNjcd+tz/qGbnuZxnV6dHlWq/Q5mch94
N2FVgJKppQzTBfyHIMKFH1biVWwRn4g5R7RaAk5UwCvPM1pvbiZ0ypmv6O1LR5vS
ifDxLQlHIyiDsrIAquU67iCDzF6gNKXo9PhWh/9EiRjqHa0LcVEzG0sCgYEAxW4e
Ytf25AVvTciywgx5MyA1dOop0Fyn3HbsvuyzTOIa7/g96LjeYBJvHlMNiSoG6XJb
kIG0S+o2OYHqxrjyokMxqHCh8HnlxaEsged41B1h3HyMjX6WbLlEZLLZvCPnahue
QDPRmSXYaSmaRzMSo0uYIdxwzKiGj3XDIHe22vECgYB2Rnn5SD3P7pg6S2uuHptM
ddXw95JNJtz0+ImCUQ3UO/fFoWUM2yzd0r+lpA5jHJh067cdx7r1//0FcW9gMmHg
kxEfg6b7JSEBj+o0wLqrwREkUUs/rp2vwdLHodfVrmey4+kpNruad6nvUlF4YTL7
VGPHdlyUAb3r/vZIAPUQSwKBgD3Erg0OtFeyu5gCaqr7bA/qy87AVES0OHBpZLh3
JcGwG+1oJTZiYHB+U/WQ1nNLis4O0UbszZPSuxRS6TkzM/ZAP5ELbB7ohFLIkjwy
R0NVzgBFl1PNfxKVBCjdK/II6aXw7hn4HGNly8dbFMGh4Prl87rkVQYy06aemWXX
DoaBAoGBAJuVvZ0oEKJrR1PnsUzEJ2tMCgDhUyoju8CrhDu22VMk1xjiepuXLkxC
pp6aLTMmDiSHNClIovKdYaWLjCAN7ier7cjxuSMiWUe8kJqz9fnWzAZAGrvjmxda
fYYxHSyp17vuhDvzsjXTWHvh8AZhG6xvt2bp3MIDyCX61D/2alLj
-----END RSA PRIVATE KEY-----`
