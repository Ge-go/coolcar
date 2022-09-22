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
MIIEpAIBAAKCAQEAjxOkHahwnPbKMHsPBE9KrSQDEd968SRrKc7aFum5WSrXcttU
/z+VVU59Q9MngmRhRM6txArmBxp2oTI9qH6qcPWp7yv+FIWR5+HFpp5BTuXBFe9N
p2jrIbtH/ZStaC18bQBfu63hsEsqi2EAkMnijqWiDV4scnTwEyAZXgGjr8lqHlKB
/Oiid/x15r9eIyvC0vbEdd2oCbUFkreVzU2oNxfSxGw1kagHfBG7LYuSfXCq8RL+
zU0Bk/chAWYIj9f/UFrwz4006NTEoVLaWlsE0orNmBJgAf5hdSVMAiaa1I23kZst
DpbxRjrKL0BXvHxxj0Fm9wz522cXCOb3/W7N5wIDAQABAoIBAQCG1vfgi5I2G8/J
iPBKG4BBVKMgAQIYqT3llPCsj3ECvAF4WYTtWbsfPm2HskSV+oxBEJdrHupS33nV
yUeauGVhN+UDZu554Lf1VS21LYhXFui2B2Wj1JlknN/n+GrEt7l/8M5ITkNYpj5e
RPkHe3xs+2SSPKKe694l6CaAFgNx8mbl4iMM6UfNKhpaYoIEy/v8iNeTmVYffG4M
lHKY/26Q0qfjPmRFtYEdfP1HafsnpnWJ0vPZzGsD8ScV88MxJOeJbSJYH6i6qVbJ
/CD9aJtyRClf30mvK6TrnKMAeeg5AIIqwcE66C5H0VjDrmm4LxU52V2YCrVwJlog
zfcNbQihAoGBAPmo4lZ3RpyWTZtzkenbM2ZA/AIbgYR3QDs3UnhAIGB0xU4QdH+5
PnPX6Qgk0UpQm4AWAvIZkveDXMYxos7W0DeqbaZUCsUrCXVsutZDi8fwfxfsxhRC
3dNp4tcnodeTEMiAl6C5xNDSVwDFNAphRl0lASPT673Hwcb5R5XaLVkbAoGBAJK1
09+oy8y5ChdCskCSyLFrrZUW/qQ5O5XyI781qcrM4NTjjqIVHkMafiuhOf9rLjWl
yqRZZuQdDaJazQThiHcQOu62Dx/WH7mQZcTAArZ60zWHL4qBYW3VZ14aLdn5UMlr
BdpM/VPMcOgl3G6evDMup42fNSPkcg6PWUD3FpclAoGBAJcYFbs8vphgAqH1BLbi
ea4F4D6qRO1VeqMb7SZnsPCPWyXOoaL3CovzfM338k4mkKWpLKk2vxJbBxfPzHef
3C4EUA4cyNPhIv1VC5JHGN6td02Ud6ClgzjC2Y1bKACeucaOxLV6GFpFInCN6Nvr
WTlf/tufEwotTeJM1X0kqNNHAoGAY8/WvMSPGtINHnQe57W1WpeiedsyFTJm6oXZ
ch4lTTcEA3JpuLXbZ9XfXvmKhs45mwAXlKbKTInDm+BguWBjQnXFUmCEe6lm3g1y
X2AuuE1p4nH9kyKg0WOttqTi6vgm0VHBoppcgyWE7zvK82uFKOEl10Eomymxu1wl
YgB42w0CgYA1nwNfwxxxoLVxGpVh4WbrMlbBz5N9wx3DYLhvPqUc3W0H9SzuZ/YR
BMn8ha7Cdy/AYwG3ufqKVzOUd5JeUxQHsjKgvM45qJDn9YZRaGFjZ3l6eSxA7VbN
+ZBOV0v6Y10QEblUJu8QuG5O1iDlhGvnBofng92kcTIMSwCvqGEPcg==
-----END RSA PRIVATE KEY-----`
