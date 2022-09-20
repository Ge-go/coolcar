"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_1 = require("../../utils/routing");
// pages/pay/pay.ts
Page({
    data: {
        orderAmount: '',
        travelTime: '',
        orderNum: 'seq-QS99STT8725',
        date: '2022-09-16',
    },
    onLoad(opt) {
        this.setData({
            orderAmount: opt.travel_expenses,
            travelTime: opt.travel_time
        });
    },
    //TODO: 这里的支付暂时先不做了
    payFor() {
    },
    toIndex() {
        wx.redirectTo({
            url: routing_1.routing.mytrips(),
        });
    }
});
