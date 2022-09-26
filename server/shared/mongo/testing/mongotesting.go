package mongotesting

import (
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"testing"
)

const (
	image         = "mongo"
	containerPort = "27017/tcp"
)

var mongoURI string
var defaultURI = "mongodb://localhost:27017"

func RunWithMongoInDocker(m *testing.M) int {
	c, err := client.NewClientWithOpts()

	resp, err := c.ContainerCreate(context.Background(), &container.Config{
		Image: image,
		ExposedPorts: nat.PortSet{
			containerPort: {},
		},
	}, &container.HostConfig{
		PortBindings: nat.PortMap{
			containerPort: []nat.PortBinding{
				{
					HostIP:   "0.0.0.0",
					HostPort: "0", //自动挑一个端口
				},
			},
		},
	}, nil, nil, "")

	if err != nil {
		panic(err)
	}

	containerID := resp.ID
	err = c.ContainerStart(context.Background(), containerID, types.ContainerStartOptions{})
	if err != nil {
		panic(err)
	}

	//移除容器
	defer func() {
		err = c.ContainerRemove(context.Background(), containerID, types.ContainerRemoveOptions{
			Force: true,
		})
		if err != nil {
			panic(err)
		}
	}()

	fmt.Println("container is staring ...")

	inspect, err := c.ContainerInspect(context.Background(), containerID)
	if err != nil {
		panic(err)
	}
	//获取当前容器ip和端口
	fmt.Println("docker test server is :", inspect.NetworkSettings.Ports[containerPort][0])
	hostPort := inspect.NetworkSettings.Ports[containerPort][0]
	mongoURI = fmt.Sprintf("mongodb://%s:%s/coolcar?readPreference=primary&ssl=false", hostPort.HostIP, hostPort.HostPort)

	return m.Run()
}

// NewClient Create a virtual container with mongo
func NewClient(ctx context.Context) (*mongo.Client, error) {
	if mongoURI == "" {
		return nil, fmt.Errorf("mongo uri not set. Please go to RunWithMongoInDocker set uri")
	}
	return mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
}

// NewDefaultClient Create containers locally with mongo
func NewDefaultClient(ctx context.Context) (*mongo.Client, error) {
	return mongo.Connect(ctx, options.Client().ApplyURI(defaultURI))
}

// SetupIndex Create Index for mongo db
func SetupIndex(ctx context.Context, d *mongo.Database) error {
	_, err := d.Collection("account").Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys: bson.D{
			{Key: "open_id", Value: 1},
		},
		Options: options.Index().SetUnique(true),
	})
	if err != nil {
		return err
	}

	_, err = d.Collection("trip").Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys: bson.D{
			{Key: "trip.accountid", Value: 1},
			{Key: "trip.status", Value: 1},
		},
		Options: options.Index().SetUnique(true).SetPartialFilterExpression(bson.M{
			"trip.status": 1,
		}),
	})

	return err
}
