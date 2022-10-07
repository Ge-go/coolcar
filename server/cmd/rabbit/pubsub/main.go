package main

import (
	"fmt"
	"github.com/streadway/amqp"
	"time"
)

const exchange = "go_ex"

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

	err = ch.ExchangeDeclare(
		exchange,
		"fanout", // 无脑转发
		true,     // durable
		false,    //autoDelete
		false,    //只能内部exchange发消息 所以false
		false,    //args
		nil,
	)
	if err != nil {
		panic(err)
	}

	go subscribe(conn, exchange)
	go subscribe(conn, exchange)

	i := 0
	for {
		i++
		err = ch.Publish(
			exchange, //exchange
			"",       //关键词key
			false,    //mandatory
			false,    //immediate
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

func subscribe(conn *amqp.Connection, ex string) {
	ch, err := conn.Channel()
	if err != nil {
		panic(err)
	}

	defer ch.Close()

	q, err := ch.QueueDeclare(
		"",
		false,
		true,
		false,
		false,
		nil,
	)

	defer ch.QueueDelete(q.Name, false, false, false)

	if err != nil {
		panic(err)
	}

	err = ch.QueueBind(
		q.Name,
		"", // key
		ex,
		false,
		nil,
	)
	if err != nil {
		panic(err)
	}

	consume("c", ch, q.Name)
}

func consume(name string, ch *amqp.Channel, q string) {
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
