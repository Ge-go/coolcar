package profile

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/rental/profile/dao"
	"coolcar/shared/auth"
	"coolcar/shared/id"
	mongotesting "coolcar/shared/mongo/testing"
	"coolcar/shared/server"
	"testing"
)

//测试Profile提交服务
func Test_Profile(t *testing.T) {
	ctx := context.Background()
	client, err := mongotesting.NewClient(ctx)
	if err != nil {
		t.Fatalf("cannot mongotesting new client:%v", err)
	}
	m := dao.NewMongo(client.Database("coolcar"))
	mongotesting.SetupIndex(ctx, client.Database("coolcar"))
	logger, err := server.NewZapLogger()
	if err != nil {
		t.Fatalf("cannot new zaplogger:%v", err)
	}

	s := &Service{
		Mongo:  m,
		Logger: logger,
	}

	aid := id.AccountID("account1")
	ctx = auth.ContextWithAccountID(ctx, aid)

	cases := []struct {
		name       string
		op         func() (*rentalpb.Profile, error)
		wantName   string
		wantStatus rentalpb.IdentityStatus
		wantErr    bool
	}{
		{
			name: "get_profile",
			op: func() (*rentalpb.Profile, error) {
				return s.GetProfile(ctx, &rentalpb.GetProfileReq{})
			},
			wantStatus: rentalpb.IdentityStatus_UNSUBMITTED,
		},
		{
			name: "submit",
			op: func() (*rentalpb.Profile, error) {
				return s.SubmitProfile(ctx, &rentalpb.Identity{
					Name: "abc",
				})
			},
			wantName:   "abc",
			wantStatus: rentalpb.IdentityStatus_PENDING,
		},
		{
			name: "submit",
			op: func() (*rentalpb.Profile, error) {
				return s.SubmitProfile(ctx, &rentalpb.Identity{
					Name: "abc",
				})
			},
			wantErr: true,
		},
		{
			name: "todo_verify",
			op: func() (*rentalpb.Profile, error) {
				p := &rentalpb.Profile{
					Identity: &rentalpb.Identity{
						Name: "abc",
					},
					IdentityStatus: rentalpb.IdentityStatus_VERIFIED,
				}
				err = s.Mongo.UpdateProfile(ctx, aid, p.IdentityStatus, p)
				if err != nil {
					return nil, err
				}
				return p, nil
			},
			wantName:   "abc",
			wantStatus: rentalpb.IdentityStatus_VERIFIED,
		},
		{
			name: "clear",
			op: func() (*rentalpb.Profile, error) {
				return s.ClearProfile(ctx, &rentalpb.ClearProfileReq{})
			},
			wantStatus: rentalpb.IdentityStatus_UNSUBMITTED,
		},
	}

	for _, v := range cases {
		p, err := v.op()
		if v.wantErr {
			if err == nil {
				t.Errorf("i'v want:%v;but got %v;", v.wantErr, err)
			} else {
				continue
			}
		}
		if err != nil {
			t.Errorf("%v get err :%v", v.name, err)
		}

		if v.wantStatus != p.IdentityStatus {
			t.Errorf("i'v want status %v;but got %v;", v.wantStatus, p.IdentityStatus)
		}
	}
}
