package token

import (
	"github.com/dgrijalva/jwt-go"
	"testing"
	"time"
)

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQB0/VvBMMCh5r7KRjx6DhN+
wOM4IQLMb12X+scFjQmt59VGiTovUP+mUrHjl0YnJ+H9bnYMWCxX1UAD83kCH49w
j4wBSAIYott5NkrWvzxkMCIMYXCAMOZs6ZgKam7e1U5U/ntFEguBcv3OsByXNHCZ
lmlwxhi/cGIAZhTFc0BcKsbc16wjw+6vj5re4VsSu+BoIHiBL38BNR5vCzjW1H0X
JG2KMbYdNJVd41oMS1Xi9rJ4AZHx3B7lrjP01ghg6eY0cz9L4EBtTg1MPgH2N/OT
Q9iLeH00UygXy/q1PY5ktulgm6Q21g9HhTdz/csVhq4hTrG7ONttBUTr19G4oHCD
AgMBAAE=
-----END PUBLIC KEY-----`

func Test_JWTVerify(t *testing.T) {
	pem, err := jwt.ParseRSAPublicKeyFromPEM([]byte(publicKey))
	if err != nil {
		t.Fatalf("parse RSA pbk is err:%v", err)
	}

	jwtVerf := &JWTTokenVerifier{PublicKey: pem}

	cases := []struct {
		name    string
		token   string
		now     time.Time
		want    string
		wantErr bool
	}{
		{
			name:  "verify token is right",
			token: "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyNDYyMjIsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiY29vbGNhci9hdXRoIiwic3ViIjoiNjMyYjE2Y2NjOWE2MjRlMTEyMjNhNjAwIn0.HsuKoDOoYu9jug_dILReXekCXRdMAa2Hk-s7qEqRGvBCfg-spzPOzRn1ejDmKkxx45xQc0Lf-TvrXvtxoZtb-2p36NgYs5nX-uFhmk3_dryJoyr8ADG1cL9zKme4UVSfbqg3TZEh76eCMntN5OgekvSC6N-wmVPQSJ0HnXZFgvNVeFjp6rmg1e-erPzkllZUfPYLWxFY5njuvRhnjEAUHKxTaiZqLPleetXoPf-aN1-jKCpQ1ZT-PbEtDcQ3BWNYbsrJ4gYssnikBke6cIWuVjl7uydFe1nTGwch1Vb3--kE6_AMkgsZfFKSRA4fA4s5kRMjAJE-Gzl4lRf1EXqAfw",
			now:   time.Unix(1516239022, 0),
			want:  "632b16ccc9a624e11223a600",
		},
		{
			name:    "token is expire",
			token:   "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyNDYyMjIsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiY29vbGNhci9hdXRoIiwic3ViIjoiNjMyYjE2Y2NjOWE2MjRlMTEyMjNhNjAwIn0.HsuKoDOoYu9jug_dILReXekCXRdMAa2Hk-s7qEqRGvBCfg-spzPOzRn1ejDmKkxx45xQc0Lf-TvrXvtxoZtb-2p36NgYs5nX-uFhmk3_dryJoyr8ADG1cL9zKme4UVSfbqg3TZEh76eCMntN5OgekvSC6N-wmVPQSJ0HnXZFgvNVeFjp6rmg1e-erPzkllZUfPYLWxFY5njuvRhnjEAUHKxTaiZqLPleetXoPf-aN1-jKCpQ1ZT-PbEtDcQ3BWNYbsrJ4gYssnikBke6cIWuVjl7uydFe1nTGwch1Vb3--kE6_AMkgsZfFKSRA4fA4s5kRMjAJE-Gzl4lRf1EXqAfw",
			now:     time.Unix(1526239022, 0),
			wantErr: true,
		},
		{
			name:    "bad token",
			token:   "bad_token",
			now:     time.Unix(1516239022, 0),
			wantErr: true,
		},
		{
			name:    "forge token",
			token:   "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyNDYyMjIsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiY29vbGNhci9hdXRoIiwic3ViIjoiNjMyYjE2Y2NjOWE2MjRlMTEyMjNhNjAxIn0.kTWebtNQqeiccpOwfhQHJWZDk1cPoSfHZ0jH_oHMy6jN6Qcd5ay1JMpJzhI5HZVtqsvqsiaAhWlt5YFSFr0AeQcwSDGx_e-pgy6hNM0D4ZUwtHaXrxEvVcKTygWssJDvzyP9DZJCw2bXuSUX50KFSsd__A69Kmf9_SpiaYrY9P6YIt7oMpK2JvQDXY4yeMJyiyR5ZYhQnEUNqzmYAwoCXMxA0nKz1UeyK18zZ_GsDptC6fh4sndpnb96UNRYWzW5C4bEMAE1tIUferQTKO7wZVDFcus4CAXj7A1dDx0uI_R5Cyt9xgnw3_sQ6tVJt02YCoPGlWGvNYdrgpfvOZExAA",
			now:     time.Unix(1516239022, 0),
			wantErr: true,
		},
	}

	for _, cs := range cases {
		t.Run(cs.name, func(t *testing.T) {
			jwt.TimeFunc = func() time.Time {
				return cs.now
			}
			verify, err := jwtVerf.Verify(cs.token)
			//if err != nil {
			//	t.Errorf("cannot verify jwt token : %v", err)
			//}

			if !cs.wantErr && err != nil {
				t.Errorf("verfication failed: %v", err)
			}

			if cs.wantErr && err == nil {
				t.Errorf("want error; got no error")
			}

			if verify != cs.want {
				t.Errorf("i'v want:%q;but got:%q;", cs.want, verify)
			}
		})
	}
}
