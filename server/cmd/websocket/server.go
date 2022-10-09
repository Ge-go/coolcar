package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"strconv"
	"time"
)

func main() {
	http.HandleFunc("/ws", handleWebSocket)
	log.Fatal(http.ListenAndServe(":9090", nil))
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	u := websocket.Upgrader{}
	conn, err := u.Upgrade(w, r, nil)
	if err != nil {
		fmt.Printf("cannot Upgrade,%v\n", err)
		return
	}
	defer conn.Close()

	done := make(chan struct{})
	go func() {
		for {
			m := make(map[string]interface{})
			err := conn.ReadJSON(&m)
			if err != nil {
				if !websocket.IsCloseError(err, websocket.CloseGoingAway, websocket.CloseNormalClosure, websocket.CloseNoStatusReceived) {
					fmt.Printf("unexpected read error:%v\n", err)
				}
				fmt.Printf("cannot read json:%v\n", err)
				done <- struct{}{}
				break
			}
			fmt.Printf("message recv: %v\n", m)
		}
	}()

	i := 0
	for {
		select {
		case <-time.After(0.2e9):
		case <-done:
			return
		}

		i++
		err := conn.WriteJSON(map[string]string{
			"hello":  "websocket",
			"msg_id": strconv.Itoa(i),
		})
		if err != nil {
			if err == websocket.ErrCloseSent {
				continue
			}
			fmt.Printf("cannot write json %v\n", err)
		}
	}
}
