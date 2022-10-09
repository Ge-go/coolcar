package mq

import (
	"context"
	carpb "coolcar/car/api/gen/v1"
)

// Publisher defines the publishing interface
type Publisher interface {
	Publish(ctx context.Context, car *carpb.CarEntity) error
}

type Subscriber interface {
	Subscribe(ctx context.Context) (chan *carpb.CarEntity, func(), error)
}
