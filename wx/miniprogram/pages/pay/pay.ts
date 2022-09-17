// pages/pay/pay.ts
Page({
    data: {
        orderAmount: '' as string | undefined,  //订单金额
        travelTime: '',  //使用时间
        orderNum: 'seq-QS99STT8725',  //订单号
        date: '2022-09-16',  //订单日期
    },

    onLoad(opt) {
        this.setData({
            orderAmount: opt.travel_expenses,
            travelTime: opt.travel_time
        })
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