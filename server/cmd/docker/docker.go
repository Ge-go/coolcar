package main

import (
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
	"time"
)

//本地使用docker加载mongo镜像服务
func main() {
	c, err := client.NewEnvClient()
	if err != nil {
		panic(err)
	}

	resp, err := c.ContainerCreate(context.Background(), &container.Config{
		Image: "mongo",
		ExposedPorts: nat.PortSet{
			"27017/tcp": {},
		},
	}, &container.HostConfig{
		PortBindings: nat.PortMap{
			"27017/tcp": []nat.PortBinding{
				{
					HostIP:   "127.0.0.1",
					HostPort: "0", //自动挑一个端口
				},
			},
		},
	}, nil, nil, "")

	if err != nil {
		panic(err)
	}

	err = c.ContainerStart(context.Background(), resp.ID, types.ContainerStartOptions{})
	if err != nil {
		panic(err)
	}

	//停止容器
	//c.ContainerStop()

	//杀死容器
	//c.ContainerKill()

	fmt.Println("container is staring ...")

	inspect, err := c.ContainerInspect(context.Background(), resp.ID)
	if err != nil {
		panic(err)
	}
	//获取当前容器ip和端口
	fmt.Println(inspect.NetworkSettings.Ports["27017/tcp"][0])

	time.Sleep(5e9)
	fmt.Println("container is closing ...")

	//移除容器
	err = c.ContainerRemove(context.Background(), resp.ID, types.ContainerRemoveOptions{
		Force: true,
	})

	if err != nil {
		panic(err)
	}
}
