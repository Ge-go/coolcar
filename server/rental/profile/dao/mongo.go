package dao

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/shared/id"
	mgo "coolcar/shared/mongo"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	profileField        = "profile"
	accountIDField      = "accountid"
	identityStatusField = profileField + ".identitystatus"
	photoBlobIDField    = "photoblobid"
)

type Mongo struct {
	col *mongo.Collection
}

func NewMongo(db *mongo.Database) *Mongo {
	return &Mongo{
		col: db.Collection(profileField),
	}
}

type ProfileRecord struct {
	AccountID   string            `bson:"accountid"`
	Profile     *rentalpb.Profile `bson:"profile"`
	PhotoBlobID string            `bson:"photoblobid"`
}

func (m *Mongo) GetProfile(ctx context.Context, aid id.AccountID) (*ProfileRecord, error) {
	res := m.col.FindOne(ctx, bson.M{
		accountIDField: aid.String(),
	})

	if err := res.Err(); err != nil {
		return nil, err
	}

	var pr ProfileRecord
	if err := res.Decode(&pr); err != nil {
		return nil, fmt.Errorf("cannot decode profile record:%v", err)
	}

	return &pr, nil
}

func (m *Mongo) UpdateProfile(ctx context.Context, aid id.AccountID, prevState rentalpb.IdentityStatus, p *rentalpb.Profile) error {
	//可能存在先注册驾驶证,生成blobID,造成下面条件失效,引入ZeroOrDoesNotExist,多条件判断
	filter := bson.M{
		identityStatusField: prevState,
	}

	if prevState == rentalpb.IdentityStatus_UNSUBMITTED {
		filter = mgo.ZeroOrDoesNotExist(identityStatusField, prevState)
	}

	filter[accountIDField] = aid.String()

	_, err := m.col.UpdateOne(ctx, filter, mgo.Set(bson.M{
		accountIDField: aid.String(),
		profileField:   p,
	}), options.Update().SetUpsert(true))

	return err
}

func (m *Mongo) UpdateProfilePhoto(ctx context.Context, aid id.AccountID, bid id.BlobID) error {
	_, err := m.col.UpdateOne(ctx, bson.M{
		accountIDField: aid.String(),
	}, mgo.Set(bson.M{
		accountIDField:   aid.String(),
		photoBlobIDField: bid.String(),
	}), options.Update().SetUpsert(true))

	return err
}
