package id

// AccountID defines account id object.
type AccountID string

func (a AccountID) String() string {
	return string(a)
}

type TripID string

func (t TripID) String() string {
	return string(t)
}

type Identity string

func (i Identity) String() string {
	return string(i)
}
