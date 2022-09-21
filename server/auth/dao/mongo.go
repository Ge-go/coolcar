package dao

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Mongo struct {
	col *mongo.Collection
}

// NewMongo create a new mongo dao.
func NewMongo(db *mongo.Database) *Mongo {
	return &Mongo{
		//用户db
		col: db.Collection("account"),
	}
}

func (m *Mongo) ResolveAccountID(ctx context.Context, openID string) (string, error) {
	res := m.col.FindOneAndUpdate(ctx, bson.M{
		"open_id": openID,
	}, bson.M{
		"$set": bson.M{
			"open_id": openID,
		},
	}, options.FindOneAndUpdate().
		SetUpsert(true).
		SetReturnDocument(options.After))

	if err := res.Err(); err != nil {
		return "", fmt.Errorf("cannot findOneAndUpdate:%v", err)
	}

	var row struct {
		ID primitive.ObjectID `bson:"_id"`
	}

	err := res.Decode(&row)
	if err != nil {
		return "", fmt.Errorf("cannot decode result:%v", err)
	}

	return row.ID.Hex(), nil
}
