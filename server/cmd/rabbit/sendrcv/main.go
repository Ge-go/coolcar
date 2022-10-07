package main

import (
	"fmt"
	"github.com/streadway/amqp"
	"time"
)

// 学习使用rabbitmq
func main() {
	conn, err := amqp.Dial("amqp://guest:guest@121.37.232.8:5672/")
	if err != nil {
		panic(err)
	}

	ch, err := conn.Channel()
	if err != nil {
		panic(err)
	}

	q, err := ch.QueueDeclare(
		"go_q1",
		true,  // durable
		false, // autoDelete
		false, //exlusive
		false, //noWait
		nil,   //args
	)
	if err != nil {
		panic(err)
	}

	go consume("c1", conn, q.Name)
	go consume("c2", conn, q.Name)

	i := 0
	for {
		i++
		err = ch.Publish(
			"", //exchange
			q.Name,
			false, //mandatory
			false, //immediate
			amqp.Publishing{
				Body: []byte(fmt.Sprintf("message %d", i)),
			},
		)
		if err != nil {
			fmt.Println(err)
		}
		time.Sleep(200 * time.Millisecond)
	}
}

func consume(name string, conn *amqp.Connection, q string) {
	ch, err := conn.Channel()
	if err != nil {
		panic(err)
	}
	defer ch.Close()

	msgs, err := ch.Consume(
		q,
		name,  //consumer
		true,  //autoAck
		false, // exclusive
		false, //noLocal
		false, // noWait
		nil,   //args
	)
	if err != nil {
		panic(err)
	}

	for msg := range msgs {
		fmt.Printf("%s\\%s\n", name, msg.Body)
	}
}
