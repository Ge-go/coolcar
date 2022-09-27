import { TripService } from "../../service/trip"
import { routing } from "../../utils/routing"

const centerPerSec = 0.7  //记录租车价格,每秒钟0.35分,如产品有改动,则计费规则可改变
// pages/driving/driving.ts
let elapsedSec = 0
let cents = 0

function formatDuration(sec: number) {  //计算时间函数
    const padString = (n: number) =>
        n < 10 ? '0' + n.toFixed(0) : n.toFixed(0)
    const h = Math.floor(sec / 3600)
    sec -= 3600 * h
    const m = Math.floor(sec / 60)
    sec -= 60 * m
    const s = Math.floor(sec)
    return `${padString(h)}:${padString(m)}:${padString(s)}`
}

function formatFee(cents: number) {  //费用计算
    return (cents / 100).toFixed(2)
}

Page({
    timer: undefined as undefined | number,  //租车时间
    data: {
        location: {
            latitude: 22,
            longitude: 100,
        },
        elapsed: '00:00:00',
        fee: '0.00',
        scale: 12,
        isSettlement: true as undefined | boolean, //是否结算
    },

    onLoad(opt: Record<'trip_id', string>) {
        const o: routing.DrivingOpts = opt
        console.log("current trip", o.trip_id)

        o.trip_id = '6332f869fcea179722eca340'
        TripService.GetTrip(o.trip_id).then(console.log)

        this.setupLocationUpdator()
        this.setupTimer()
    },

    onUnload() {
        wx.stopLocationUpdate()
        //数据清洗
        if (this.timer) {
            clearInterval(this.timer)
            elapsedSec = 0
            cents = 0
        }
    },

    //实时更新地理位置
    setupLocationUpdator() {
        wx.startLocationUpdate({  //app.json新增该字段属性,要引入后才能使用
            fail: console.error,
        })

        wx.onLocationChange(loc => {
            console.log(loc)  //用于测试是否在不断更新位置信息,该功能会比较费电耗时
            this.setData({
                location: {
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                }
            })
        })
    },

    //监控当前租车时间
    setupTimer() {
        this.timer = setInterval(() => {
            elapsedSec++
            cents += centerPerSec
            this.setData({
                elapsed: formatDuration(elapsedSec),
                fee: formatFee(cents),
            })
        }, 1000)
    },

    //结束行程  是否结束行程->判断是否在指定区域内->进入到结算页面(携带数据)
    onEndTripTap() {
        //TODO:请求后台是否处于指定区域

        //结算中
        wx.showLoading({
            title: '结算中',
            mask: true,
        })
        setTimeout(() => {
            wx.hideLoading()
        }, 500)

        //弹窗
        this.setData({
            iosDialog1: true,
        });
    },

    //关闭结束行程弹窗
    closeTip() {
        this.setData({
            iosDialog1: false,
        });
    },

    //从当前页面进入到结算页面
    toSettlement() {
        //生成订单
        console.log(elapsedSec, cents)

        wx.redirectTo({
            //url: `/pages/pay/pay?travel_time=${formatDuration(elapsedSec)}&travel_expenses=${formatFee(cents)}`,
            url: routing.Pay({
                travel_time: formatDuration(elapsedSec),
                travel_expenses: formatFee(cents)
            })
        })
    }
})