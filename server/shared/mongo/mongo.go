package mgo

import (
	"coolcar/shared/mongo/objid"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

const (
	IDFieldName        = "_id"
	UpdatedAtFieldName = "updatedat"
)

type ObjID struct {
	ID primitive.ObjectID `bson:"_id"`
}

type UpdatedAtField struct {
	UpdatedAt int64 `bson:"updatedat"`
}

var NewObjID = primitive.NewObjectID

func NewObjIDWithValue(id fmt.Stringer) {
	NewObjID = func() primitive.ObjectID {
		return objid.MustFromID(id)
	}
}

var UpdatedAt = func() int64 {
	return time.Now().UnixNano()
}

func Set(v interface{}) bson.M {
	return bson.M{
		"$set": v,
	}
}

func SetOnInsert(v interface{}) bson.M {
	return bson.M{
		"$setOnInsert": v,
	}
}

// ZeroOrDoesNotExist generates a filter expression with
// field equal to zero or filed does not exist.
func ZeroOrDoesNotExist(filed string, zero interface{}) bson.M {
	return bson.M{
		"$or": []bson.M{
			{
				filed: zero,
			},
			{
				filed: bson.M{
					"$exists": false,
				},
			},
		},
	}
}
