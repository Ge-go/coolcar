import camelcaseKeys from "camelcase-keys"
import { IAppOption } from "./appoption"
import { auth } from "./service/proto_gen/auth/auth_pb"
import { rental } from "./service/proto_gen/rental/rental_pb"

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
    // wx.request({
    //   url: 'http://localhost:8080/trip/trip123',
    //   method: 'GET',
    //   success: res => {
    //     const getTripRes = coolcar.GetTripRsp.fromObject(camelcaseKeys(res.data as object, {
    //       deep: true,  //转换所有层的下划线命名为驼峰式命名
    //     }))
    //     console.log(getTripRes)
    //   }
    // })
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        wx.request({
          url: 'http://localhost:8080/v1/auth/login',
          method: 'POST',
          data: {
            code: res.code
          } as auth.v1.ILoginReq,
          success: res => {
            const logRsp: auth.v1.ILoginRsp = auth.v1.LoginRsp.fromObject(
              camelcaseKeys(res.data as object),
            )
            console.log(logRsp)

            wx.request({
              url: 'http://localhost:8080/v1/trip',
              method: 'POST',
              data: {
                start: '123'
              } as rental.v1.ICreateTripReq,
              header: {
                authorization: 'Bearer ' + logRsp.accessToken
              },
              success: res => {
                const tripRsp: rental.v1.ICreateTripRsp = rental.v1.CreateTripRsp.fromObject(
                  camelcaseKeys(res.data as object),
                )
                console.log(tripRsp)
              }
            })
          },
          fail: console.error,
        })
      }
    })

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