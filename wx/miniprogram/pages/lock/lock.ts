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
  }
})