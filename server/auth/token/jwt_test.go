package token

import (
	"github.com/dgrijalva/jwt-go"
	"testing"
	"time"
)

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

func TestGenerateToken(t *testing.T) {
	key, err := jwt.ParseRSAPrivateKeyFromPEM([]byte(PrivateKey))
	if err != nil {
		t.Fatalf("cannot parse private key: %v", err)
	}
	g := NewJWTToken("coolcar/auth", key)
	g.nowFunc = func() time.Time {
		return time.Unix(1516239022, 0)
	}
	token, err := g.GenerateToken("632b16ccc9a624e11223a600", 2*time.Hour)
	if err != nil {
		t.Errorf("cannot generate token: %v", err)
	}

	//token底层排列
	want := "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyNDYyMjIsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiY29vbGNhci9hdXRoIiwic3ViIjoiNjMyYjE2Y2NjOWE2MjRlMTEyMjNhNjAwIn0.YyDC6FyAwlzBQf0YVfNcnldO3H1Drh2EP9e-g6sfoqd1IQVOupzXWm5EhtKvBr12pqN1MOiDeza092Ud7E6dgHRhCPIgIF64keQiuNuIeFhNPz71q3YCvXOH45jJMIxS3xpCgrmO58PsBwC8ic3SW4q7zi-IsiyeIWW3IGXVLr5FDj6uTUwfml4rhdgz2znFAQYE2ZDl_mVUIroOzsPh0f53Lj9SKD8agVZgME-SyTBhyBxXZQxLP1nf9jepklzxHiTbtfCUbd7wo2WNbwUoj01zJ2DoAQ_-1vuy90MbrY5A8yvLXH7tiEcIUXlkhqkYdTqBGfosQep1as9vBuKMww"

	if token != want {
		t.Errorf("wrong token generated. want: %q;\n got:%q", want, token)
	}
}
