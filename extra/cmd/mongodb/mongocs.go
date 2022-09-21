package main

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	//创建一个mongo实例
	mc, err := mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://121.37.232.8:27019/coolcar?readPreference=primary&ssl=false"))
	if err != nil {
		panic(err)
	}
	col := mc.Database("coolcar").Collection("account")
	//批量插入数据
	InsertMany(col)

	var row struct {
		ID     primitive.ObjectID `bson:"_id"`
		OpenID string             `bson:"open_id"`
	}

	//查找单条数据
	FindRow(col, row)

	//批量查找数据
	FindRows(col, row)
}

func FindRows(col *mongo.Collection, row struct {
	ID     primitive.ObjectID `bson:"_id"`
	OpenID string             `bson:"open_id"`
}) {
	cur, err := col.Find(context.Background(), bson.M{})
	if err != nil {
		panic(err)
	}

	for cur.Next(context.Background()) {
		err = cur.Decode(&row)
		if err != nil {
			panic(err)
		}
		fmt.Printf("the findMany is:%+v\n", row)
	}
}

func FindRow(col *mongo.Collection, row struct {
	ID     primitive.ObjectID `bson:"_id"`
	OpenID string             `bson:"open_id"`
}) {
	res := col.FindOne(context.Background(), bson.M{
		"open_id": "123",
	})
	//拿到的数据是bson流,需要进行解码
	err := res.Decode(&row)
	if err != nil {
		panic(err)
	}
	fmt.Printf("the findOne is :%+v\n", row)
}

func InsertMany(col *mongo.Collection) {
	res, err := col.InsertMany(context.Background(), []interface{}{
		bson.M{
			"open_id": "123",
		},
		bson.M{
			"open_id": "456",
		},
	})
	if err != nil {
		panic(err)
	}

	fmt.Printf("the insertRows is:%+v\n", res)
}
