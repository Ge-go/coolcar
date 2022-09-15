const shareLocationKey = "share_Location"
// pages/lock/lock.ts
Page({
  data: {
    shareLocation: false,
    avatarURL: ''  //获取头像引入的url
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
      success: loc => {
        console.log('starting a trip', {
          location: {
            latitude: loc.latitude,
            longitude: loc.longitude,
          },
          //TODO:  这里的数据要进行处理的,用户是否要展示头像
          avatarURL: this.data.shareLocation ? this.data.avatarURL : '',
        })
        //成功后,开锁
        wx.showLoading({
          title: '开锁中',
          mask: true, //防止触摸下一层
        })
        setTimeout(() => {
          wx.redirectTo(
            {
              url: '/pages/driving/driving',
              complete: () => {
                wx.hideLoading()
              }
            })
        }, 500)
      },
      fail: () => {
        console.error,
          wx.showToast({
            icon: 'none',
            title: '请前往设置页授权位置信息',
          })
      }
    })

  }
})