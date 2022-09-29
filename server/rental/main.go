package main

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/rental/profile"
	daoProfile "coolcar/rental/profile/dao"
	"coolcar/rental/trip"
	"coolcar/rental/trip/client/car"
	"coolcar/rental/trip/client/poi"
	profileClient "coolcar/rental/trip/client/profile"
	daoTrip "coolcar/rental/trip/dao"
	"coolcar/shared/server"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"google.golang.org/grpc"
	"log"
)

func main() {
	ctx := context.Background()
	logger, err := server.NewZapLogger()
	if err != nil {
		panic(err.Error())
	}

	mgClient, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://121.37.232.8:27019/coolcar?readPreference=primary&ssl=false"))
	if err != nil {
		log.Fatalf("cannot connect mongo:%v", err)
	}

	dbTp := daoTrip.NewMongo(mgClient.Database("coolcar"))
	dbPf := daoProfile.NewMongo(mgClient.Database("coolcar"))

	pfService := &profile.Service{
		Mongo:  dbPf,
		Logger: logger,
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
				Mongo:      dbTp,
				CarManager: &car.Manager{},
				ProfileManager: &profileClient.Manager{
					Fetcher: pfService,
				},
			})

			rentalpb.RegisterProfileServiceServer(s, pfService)
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
