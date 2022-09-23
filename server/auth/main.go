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
MIIEogIBAAKCAQB0/VvBMMCh5r7KRjx6DhN+wOM4IQLMb12X+scFjQmt59VGiTov
UP+mUrHjl0YnJ+H9bnYMWCxX1UAD83kCH49wj4wBSAIYott5NkrWvzxkMCIMYXCA
MOZs6ZgKam7e1U5U/ntFEguBcv3OsByXNHCZlmlwxhi/cGIAZhTFc0BcKsbc16wj
w+6vj5re4VsSu+BoIHiBL38BNR5vCzjW1H0XJG2KMbYdNJVd41oMS1Xi9rJ4AZHx
3B7lrjP01ghg6eY0cz9L4EBtTg1MPgH2N/OTQ9iLeH00UygXy/q1PY5ktulgm6Q2
1g9HhTdz/csVhq4hTrG7ONttBUTr19G4oHCDAgMBAAECggEAX77KzT2dKeOy2dDJ
xgqnIeGzFEjQBYhPTQbMw1o+Rbmq7uN4XyknUXP0apNvsrQNXGB+9HNlNy0sCw/E
RVyXBEQ3DQVl0cvXW0h3z3ELd+N8ui006XUb4J788+lPe8ePKDhtooW2LOdzmSjA
/W7JiKl0+frmXicXzcO91CsSzVqJw8N9Z9vBqNSs94ZrR+lk08HUCwETM95iQkZ9
Wr4SIXXiPhVHkGUbSlOvilw8ZgXsTtuAQGU8zoo/JjPkRPlgR/IEUt8YtdkOZ+Hn
Ay3UY1t0Lr6kxb2hkm4G1PpcMNMqn86QHsTzXTTztBfddR/sDyF0jm++aZfX4wpZ
Vu36AQKBgQCvMuNFCfERpULH86wdpq7o2mrcgqqby8ozFgLQoWyQtTlzHv2uzFEV
03A+0MJavTC9W2hFy2OxhjMNHOOna5+JzflkNV71oDV+OYGMz17Lgt+ax+Z2Dskw
fml5YXCZFu0PtL6CCxWVa8QOss/r1dUeW0bigErUQ4XMiFrFjE8vQQKBgQCq8eyb
lkHucvML3kRKM82stXIQZF4j2TdrQjvcYB3hu0kthvvfRdTWWnBi7lk9HhZcQpx4
jtZfHNFJA/Ungdq+wRLzVH+YU+6OV92WQGON0R9hPq3T4jq4k8r3/Jp0iNePixjL
lXnw9gEJGHzFPcI9+Gf5xFS8rd5jDKsEuKTywwKBgAczqk/+NqCpEHOzupGFdo8v
21CxNl4tJGSxNPBqklHogTIQRhFXaMXi6SxL3JFqUYSXK1QjJjf38kVJuLn7HJXH
l8bcwsiKC2ji6EZnh9gJyzNLoFeeB/ssVx2cOcqxPJF2tpYV6o833NlV1GI3aglT
aziIWYscM3XS7RhNyjuBAoGAQItR5DkqscbTQBLvQ/klWmW0KL5M0UpN44DBq2bb
QYT+j2MdLONoBntlXeVS6oG2vaUlAVwlUwpFd0U4Rm+AUXADIL8x4ikmtLY2Y2ny
bPSd3ZDV/1+2/kRHabUF+KRGh9tkRFIvFa09HNsTGUJFWjK1x5e6yvb3Nfztgb3a
AhMCgYEAlJUkBRH2GIIEpEAKGyCrSXlZC6Y+ifT2lgJ2ZNLxAZ7qfAyXeG5gKCDD
V6r/loBtgqbGkDdy2h9GucILfqLC5TI4hO+q6vfxyxByxTHBZMUQmvNTGnOOefwA
zw2Z9svlbLod4mG+B1A+NSdSUx2OTWj1aivCasT1gYMAofFj5zY=
-----END RSA PRIVATE KEY-----`
