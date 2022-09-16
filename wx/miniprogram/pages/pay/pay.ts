// pages/pay/pay.ts
Page({
    data: {
        orderNum: 'seq-QS99STT8725',  //订单号
        orderAmount: wx.getStorageSync("travel_expenses") as string,  //订单金额
        travelTime: wx.getStorageSync("travel_time") as string, //使用时间
        date: '2022-09-16',  //订单日期
    },

    //TODO: 这里的支付暂时先不做了
    payFor() {

    },

    toIndex() {
        wx.redirectTo({
            url: '/pages/index/index',
        })
    }
})