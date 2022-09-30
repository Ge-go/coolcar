package dao

import (
	"context"
	"coolcar/shared/id"
	mgo "coolcar/shared/mongo"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Mongo struct {
	col *mongo.Collection
}

const aidFiled = "accountid"

func NewMongo(db *mongo.Database) *Mongo {
	return &Mongo{
		col: db.Collection("blob"),
	}
}

type BlobRecord struct {
	mgo.ObjID `bson:"inline"`
	AccountID string `bson:"accountid"`
	Path      string `bson:"path"`
}

func (m *Mongo) CreateBlob(ctx context.Context, aid id.AccountID) (*BlobRecord, error) {
	br := &BlobRecord{
		AccountID: aid.String(),
	}
	br.ID = mgo.NewObjID()

	path := fmt.Sprintf("%s/%s", aid.String(), br.ID)
	br.Path = path

	_, err := m.col.InsertOne(ctx, br)
	if err != nil {
		return nil, err
	}

	return br, nil
}

func (m *Mongo) GetBlob(ctx context.Context, id id.BlobID) (*BlobRecord, error) {
	res := m.col.FindOne(ctx, bson.M{
		aidFiled: id.String(),
	})

	if err := res.Err(); err != nil {
		return nil, err
	}

	var br BlobRecord
	if err := res.Decode(&br); err != nil {
		return nil, err
	}

	return &br, nil
}
