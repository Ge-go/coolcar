package server

import "go.uber.org/zap"

func NewZapLogger() (*zap.Logger, error) {
	logger := zap.NewDevelopmentConfig()
	logger.EncoderConfig.TimeKey = ""
	return logger.Build()
}
