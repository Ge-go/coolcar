package dao

import (
	"context"
	"coolcar/shared/id"
	mgo "coolcar/shared/mongo"
	"coolcar/shared/mongo/objid"
	mongotesting "coolcar/shared/mongo/testing"
	"go.mongodb.org/mongo-driver/bson"
	"os"
	"testing"
)

func TestMongo_ResolveAccountID(t *testing.T) {
	ctx := context.Background()
	mc, err := mongotesting.NewClient(ctx)
	if err != nil {
		t.Fatalf("cannot connect mongodb:%v", err)
	}

	m := NewMongo(mc.Database("coolcar"))
	_, err = m.col.InsertMany(ctx, []interface{}{
		bson.M{
			mgo.IDFieldName: objid.MustFromID(id.AccountID("5f7c245ab0361e00ffb9fd6f")),
			openIDField:     "openid_1",
		},
		bson.M{
			mgo.IDFieldName: objid.MustFromID(id.AccountID("5f7c245ab0361e00ffb9fd70")),
			openIDField:     "openid_2",
		},
	})
	if err != nil {
		t.Fatalf("cannot InserMany data:%v", err)
	}

	mgo.NewObjIDWithValue(id.AccountID("5f7c245ab0361e00ffb9fd71"))

	cases := []struct {
		name   string
		openID string
		want   string
	}{
		{
			name:   "existing_user",
			openID: "openid_1",
			want:   "5f7c245ab0361e00ffb9fd6f",
		},
		{
			name:   "another_existing_user",
			openID: "openid_2",
			want:   "5f7c245ab0361e00ffb9fd70",
		},
		{
			name:   "new_user",
			openID: "openid_3",
			want:   "5f7c245ab0361e00ffb9fd71",
		},
	}

	for _, cs := range cases {
		t.Run(cs.name, func(t *testing.T) {
			id, err := m.ResolveAccountID(ctx, cs.openID)
			if err != nil {
				t.Errorf("faild resolve account id for %q:%v", cs.openID, err)
			}
			if id.String() != cs.want {
				t.Errorf("resolve account id: want:%q,got:%q", cs.want, id)
			}
		})
	}
}

func TestMain(m *testing.M) {
	os.Exit(mongotesting.RunWithMongoInDocker(m))
}
