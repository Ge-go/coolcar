package ws

import (
	"context"
	"coolcar/car/mq"
	"github.com/gorilla/websocket"
	"go.uber.org/zap"
	"net/http"
)

// Handler creates a websocket http handler.
func Handler(u *websocket.Upgrader, sub mq.Subscriber, logger *zap.Logger) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		conn, err := u.Upgrade(w, r, nil)
		if err != nil {
			logger.Error("cannot Upgrade", zap.Error(err))
			return
		}
		defer conn.Close()

		msgs, cleanUp, err := sub.Subscribe(context.Background())
		defer cleanUp()
		if err != nil {
			logger.Error("cannot subscribe", zap.Error(err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		done := make(chan struct{})
		go func() {
			for {
				_, _, err := conn.ReadMessage()
				if err != nil {
					if !websocket.IsCloseError(err, websocket.CloseGoingAway, websocket.CloseNormalClosure, websocket.CloseNoStatusReceived) {
						logger.Error("unexpected read error", zap.Error(err))
					}
					done <- struct{}{}
					break
				}
			}
		}()

		for {
			select {
			case msg := <-msgs:
				err := conn.WriteJSON(msg)
				if err != nil {
					logger.Warn("cannot write JSON", zap.Error(err))
				}
			case <-done:
				return
			}
		}
	}
}
