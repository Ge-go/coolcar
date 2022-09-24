package dao

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	mgo "coolcar/shared/mongo"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	tripField = "trip"
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

	return &TripRecord{
		Trip: trip,
	}, nil
}
