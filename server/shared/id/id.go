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

type CarID string

func (c CarID) String() string {
	return string(c)
}

type BlobID string

func (b BlobID) String() string {
	return string(b)
}
