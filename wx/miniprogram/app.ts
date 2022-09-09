// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())  //从左边依次将日期写入数组当中
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
      },
    })

    // 获取用户信息,不使用回调函数
    // wx.getSetting().then(
    //   res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       return wx.getUserInfo()
    //     }
    //     return undefined
    //   }).then(res => {
    //     if (!res) {
    //       return
    //     }
    //     this.globalData.userInfo = res.userInfo
    //     //通知页面
    //     if (this.userInfoReadyCallback) {
    //       this.userInfoReadyCallback(res)
    //     }
    //   })
  },
})