import camelcaseKeys from "camelcase-keys"
import { IAppOption } from "./appoption"
import { coolcar } from "./service/proto_gen/trip_pb"

let resolveUserInfo: (value: WechatMiniprogram.UserInfo | PromiseLike<WechatMiniprogram.UserInfo>) => void
let rejectUserInfo: (reason?: any) => void

// app.ts
App<IAppOption>({
  globalData: {
    userInfo: new Promise((resolve, reject) => {
      resolveUserInfo = resolve
      rejectUserInfo = reject
    })
  },
  async onLaunch() {
    wx.request({
      url: 'http://localhost:8080/trip/trip123',
      method: 'GET',
      success: res => {
        const getTripRes = coolcar.GetTripRsp.fromObject(camelcaseKeys(res.data as object, {
          deep: true,  //转换所有层的下划线命名为驼峰式命名
        }))
        console.log(getTripRes)
      }
    })
    // 登录

    // 获取用户信息
    try {

    } catch (err) {
      rejectUserInfo(err)
    }
  },
  resolveUserInfo(userInfo: WechatMiniprogram.UserInfo) {
    resolveUserInfo(userInfo)
  }
})