package amqpclt

import (
	"context"
	carpb "coolcar/car/api/gen/v1"
	"encoding/json"
	"fmt"
	"github.com/streadway/amqp"
	"go.uber.org/zap"
)

// Publisher implements an amqp publisher.
type Publisher struct {
	ch       *amqp.Channel
	exchange string
}

func NewPublisher(conn *amqp.Connection, exchange string) (*Publisher, error) {
	ch, err := conn.Channel()
	if err != nil {
		return nil, fmt.Errorf("cannot conn Channel:%v", err)
	}

	err = declareExchange(ch, exchange)

	if err != nil {
		return nil, fmt.Errorf("cannot decalre amqp:%v", err)
	}

	return &Publisher{
		ch:       ch,
		exchange: exchange,
	}, nil
}

func (p *Publisher) Publish(ctx context.Context, car *carpb.CarEntity) error {
	b, err := json.Marshal(car)
	if err != nil {
		return fmt.Errorf("cannot marshal:%v", err)
	}

	return p.ch.Publish(
		p.exchange,
		"",
		false,
		false,
		amqp.Publishing{
			Body: b,
		},
	)
}

type Subscriber struct {
	conn     *amqp.Connection
	exchange string

	Logger *zap.Logger
}

func NewSubscriber(conn *amqp.Connection, exchange string, logger *zap.Logger) (*Subscriber, error) {
	ch, err := conn.Channel()
	if err != nil {
		return nil, fmt.Errorf("cannot allocate channel:%v", err)
	}

	defer ch.Close()
	err = declareExchange(ch, exchange)
	if err != nil {
		return nil, fmt.Errorf("cannot declare exchange:%v", err)
	}

	return &Subscriber{
		conn:     conn,
		exchange: exchange,
		Logger:   logger,
	}, nil
}

func (s *Subscriber) SubscribeRaw(ctx context.Context) (<-chan amqp.Delivery, func(), error) {
	ch, err := s.conn.Channel()
	if err != nil {
		return nil, func() {}, fmt.Errorf("cannot conn rmq chan:%v", err)
	}
	closeCh := func() {
		err := ch.Close()
		if err != nil {
			s.Logger.Error("cannot close SubscribeRaw Chan", zap.Error(err))
		}
	}

	q, err := ch.QueueDeclare(
		"",
		false,
		true,
		false,
		false,
		nil,
	)
	if err != nil {
		return nil, closeCh, fmt.Errorf("cannot declare chan:%v", err)
	}

	err = ch.QueueBind(
		q.Name,
		"", // key
		s.exchange,
		false,
		nil,
	)
	if err != nil {
		return nil, closeCh, fmt.Errorf("cannot bind chan:%v", err)
	}

	msgs, err := ch.Consume(
		q.Name,
		"",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return nil, closeCh, fmt.Errorf("cannot Consume chan:%v", err)
	}

	return msgs, closeCh, nil
}

func (s *Subscriber) Subscribe(ctx context.Context) (chan *carpb.CarEntity, error) {
	msgChan, closeChanFunc, err := s.SubscribeRaw(ctx)

	//TODO
	closeChanFunc()
	if err != nil {
		return nil, err
	}

	carCh := make(chan *carpb.CarEntity)

	go func() {
		for msg := range msgChan {
			var car carpb.CarEntity
			err := json.Unmarshal(msg.Body, &car)
			if err != nil {
				s.Logger.Error("cannot marshal car msgs", zap.Error(err))
			}
			carCh <- &car
		}
		close(carCh)
	}()

	return carCh, nil
}

func declareExchange(ch *amqp.Channel, exchange string) error {
	return ch.ExchangeDeclare(
		exchange,
		"fanout",
		true,
		false,
		false,
		false,
		nil,
	)
}
