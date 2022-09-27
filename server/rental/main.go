package main

import (
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/rental/trip"
	"coolcar/rental/trip/client/poi"
	"coolcar/shared/server"
	"google.golang.org/grpc"
)

func main() {
	logger, err := server.NewZapLogger()
	if err != nil {
		panic(err.Error())
	}

	logger.Sugar().Fatal(server.GRPCServer(&server.GRPCConfig{
		RSAPublicKey: publicKey,
		Name:         "rental",
		Addr:         ":8082",
		Logger:       logger,
		RegisterFunc: func(s *grpc.Server) {
			rentalpb.RegisterTripServiceServer(s, &trip.Service{
				Log:        logger,
				POIManager: &poi.Manager{},
			})
		},
	}))
}

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqxFwNhX/uDuKAkaaOe9m
7LHtMIvlImZvPlI7kRpRi+wuyTEAY/XZ3+ThnUotBxhKV3N8gmXXWLKn5Y5vcHUm
N0jQW6d2Dn0qWZ+EBPOHdjA5HdqAnb3yxDq3S/tS20ARUm2Xyqx/+kGrVz/G/VHO
cV3Uaq06nIUGVs0oeOQTTLlVEGjNHFvp+Ou3QLZJHjt5SdPf0P2++0hOt5OWUTY+
n0kbTjYQyDf+VK7QkMpjPUCPgdS3BQ3wK6Mrpjrc9tQ7gtvIMMP4SWN8jPAwPUfy
zJEbnTX2lI5SEW7k9fzlaAsDIRJLK8W0kSzW2cd+1VlhUC4RynVwQ+ONaUs4OqyP
mwIDAQAB
-----END PUBLIC KEY-----`
