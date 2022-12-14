package objid

import (
	"coolcar/shared/id"
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// FromID id to objID
func FromID(id fmt.Stringer) (primitive.ObjectID, error) {
	return primitive.ObjectIDFromHex(id.String())
}

// ToAccountID objID to accountID
func ToAccountID(oid primitive.ObjectID) id.AccountID {
	return id.AccountID(oid.Hex())
}

// ToTripID objID to tripID
func ToTripID(oid primitive.ObjectID) id.TripID {
	return id.TripID(oid.Hex())
}

// MustFromID convert an id to objected id ,panic an error.
func MustFromID(id fmt.Stringer) primitive.ObjectID {
	oid, err := FromID(id)
	if err != nil {
		panic(err)
	}

	return oid
}
