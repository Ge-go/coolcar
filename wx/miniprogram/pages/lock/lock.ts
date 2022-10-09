import { CarService } from "../../service/car"
import { car } from "../../service/proto_gen/car/car_pb"
import { TripService } from "../../service/trip"
import { routing } from "../../utils/routing"

const shareLocationKey = "share_Location"
// pages/lock/lock.ts
Page({
  carRefresher: 0,
  car_id: '', //汽车id
  data: {
    shareLocation: false,
    avatarURL: '',  //获取头像引入的url
  },

  onLoad(opt: Record<'car_id', string>) {
    const o: routing.LockOpts = opt
    if (o.car_id) {
      this.car_id = decodeURIComponent(opt.car_id)
    }
  },

  onChooseAvatar(e: any) {
    this.setData({
      avatarURL: e.detail.avatarUrl,
      shareLocation: wx.getStorageSync(shareLocationKey) || true
    })
  },

  onShareLocation(e: any) {
    const shareLocation: boolean = e.detail.value
    wx.setStorageSync(shareLocationKey, shareLocation)
  },

  //TODO: 后续的开锁接口
  onUnlock() {
    wx.getLocation({
      type: 'gcj02',
      success: async loc => {
        //保护car_id
        if (!this.car_id) {
          console.log('no CarID specified')
          return
        }
        const trip = await TripService.createTrip({
          carId: this.car_id,
          start: loc,
          avatarUrl: this.data.shareLocation ? this.data.avatarURL : ''
        })

        if (!trip.id) {
          console.error('no TripID in response', trip)
          return
        }

        //成功后,开锁
        wx.showLoading({
          title: '开锁中',
          mask: true, //防止触摸下一层
        })

        this.carRefresher = setInterval(async () => {
          const c = await CarService.getCar(this.car_id)
          if (c.status === car.v1.CarStatus.UNLOCKED) {
            wx.redirectTo(
              {
                url: routing.drving({
                  trip_id: trip.id!,
                }),
                complete: () => {
                  wx.hideLoading()
                }
              })
          }
        }, 2000)

      },
      fail: () => {
        console.error,
          wx.showToast({
            icon: 'none',
            title: '请前往设置页授权位置信息',
          })
      }
    })
  },

  onUnload() {
    this.clearCarRefresher()
    wx.hideLoading()
  },

  clearCarRefresher() {
    if (this.carRefresher) {
      clearInterval(this.carRefresher)
      this.carRefresher = 0
    }
  }
})