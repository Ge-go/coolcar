package mongotesting

import (
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
	"testing"
)

const (
	image         = "mongo"
	containerPort = "27017/tcp"
)

func RunWithMongoInDocker(m *testing.M, mongoURI *string) int {
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
	*mongoURI = fmt.Sprintf("mongodb://%s:%s/coolcar?readPreference=primary&ssl=false", hostPort.HostIP, hostPort.HostPort)

	return m.Run()
}
