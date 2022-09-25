package dao

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/shared/auth"
	mgo "coolcar/shared/mongo"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	tripField      = "trip"
	accountIDField = tripField + ".accountid"
)

type Mongo struct {
	col *mongo.Collection
}

func NewMongo(db *mongo.Database) *Mongo {
	return &Mongo{
		col: db.Collection(tripField),
	}
}

type TripRecord struct {
	mgo.ObjID
	mgo.UpdatedAtField
	Trip *rentalpb.Trip `bson:"trip"`
}

func (m *Mongo) CreateTrip(ctx context.Context, trip *rentalpb.Trip) (*TripRecord, error) {
	r := &TripRecord{
		Trip: trip,
	}
	r.ID = mgo.NewObjID()
	r.UpdatedAt = mgo.UpdatedAt()

	_, err := m.col.InsertOne(ctx, r)
	if err != nil {
		return nil, err
	}

	return r, nil
}

func (m *Mongo) GetTrip(ctx context.Context, id string, accountID auth.AccountID) (*TripRecord, error) {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, fmt.Errorf("invalid id: %v", err)
	}

	res := m.col.FindOne(ctx, bson.M{
		mgo.IDFieldName: objID,
		accountIDField:  accountID,
	})

	if err = res.Err(); err != nil {
		return nil, err
	}

	var tr TripRecord
	if err = res.Decode(&tr); err != nil {
		return nil, fmt.Errorf("cannot decode triprecord:%v", err)
	}

	return &tr, nil
}
