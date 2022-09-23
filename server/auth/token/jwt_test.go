package token

import (
	"github.com/dgrijalva/jwt-go"
	"testing"
	"time"
)

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
	want:="eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyNDYyMjIsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiY29vbGNhci9hdXRoIiwic3ViIjoiNjMyYjE2Y2NjOWE2MjRlMTEyMjNhNjAwIn0.HsuKoDOoYu9jug_dILReXekCXRdMAa2Hk-s7qEqRGvBCfg-spzPOzRn1ejDmKkxx45xQc0Lf-TvrXvtxoZtb-2p36NgYs5nX-uFhmk3_dryJoyr8ADG1cL9zKme4UVSfbqg3TZEh76eCMntN5OgekvSC6N-wmVPQSJ0HnXZFgvNVeFjp6rmg1e-erPzkllZUfPYLWxFY5njuvRhnjEAUHKxTaiZqLPleetXoPf-aN1-jKCpQ1ZT-PbEtDcQ3BWNYbsrJ4gYssnikBke6cIWuVjl7uydFe1nTGwch1Vb3--kE6_AMkgsZfFKSRA4fA4s5kRMjAJE-Gzl4lRf1EXqAfw"

	if token != want {
		t.Errorf("wrong token generated. want: %q;\n got:%q", want, token)
	}
}
