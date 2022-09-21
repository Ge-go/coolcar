"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camelcase_keys_1 = __importDefault(require("camelcase-keys"));
const trip_pb_1 = require("./service/proto_gen/trip_pb");
let resolveUserInfo;
let rejectUserInfo;
// app.ts
App({
    globalData: {
        userInfo: new Promise((resolve, reject) => {
            resolveUserInfo = resolve;
            rejectUserInfo = reject;
        })
    },
    async onLaunch() {
        // wx.request({
        //     url: 'http://localhost:8080/trip/trip123',
        //     method: 'GET',
        //     success: res => {
        //         const getTripRes = trip_pb_1.coolcar.GetTripRsp.fromObject(camelcase_keys_1.default(res.data, {
        //             deep: true,
        //         }));
        //         console.log(getTripRes);
        //     }
        // });
        // 登录
        // 获取用户信息
        try {
        }
        catch (err) {
            rejectUserInfo(err);
        }
    },
    resolveUserInfo(userInfo) {
        resolveUserInfo(userInfo);
    }
});
