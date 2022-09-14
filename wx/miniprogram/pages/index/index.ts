Page({
  isPageShowing: false,
  data: {
    avatarURL: '',  //头像url
    setting: {  //map setting
      skew: 0,
      rotate: 0,
      showLocation: true,
      showScale: true,
      subKey: '',
      layerStyle: -1,
      enableZoom: true,
      enableScroll: true,
      enableRotate: false,
      showCompass: false,
      enable3D: false,
      enableOverlooking: false,
      enableSatellite: false,
      enableTraffic: false,
    },
    location: {
      latitude: 31,
      longitude: 120
    },
    scale: 10,
    markers: [
      {
        iconPath: "/resources/car.png",
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        joinCluster: true, // 指定了该参数才会参与聚合
        width: 20,
        height: 20,
      },
      {
        iconPath: "/resources/car.png",
        id: 1,
        latitude: 23.099994,
        longitude: 114.324520,
        joinCluster: true, // 指定了该参数才会参与聚合
        width: 20,
        height: 20,
      },
      {
        iconPath: "/resources/car.png",
        id: 2,
        latitude: 29.756825521115363,
        longitude: 121.87222114786053,
        joinCluster: true, // 指定了该参数才会参与聚合
        width: 20,
        height: 20,
      },
    ]
  },

  onLoad() {  //目前能力只有手动拉起头像
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo.avatarUrl)
        this.setData({
          avatarURL: res.userInfo.avatarUrl,
        })
      }
    })
  },

  onMyLocationTap() {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.setData({
          location: {
            latitude: res.latitude,
            longitude: res.longitude,
          }
        })
      },
      fail: () => {
        wx.showToast({
          icon: 'none',
          title: '请勿频繁查询定位'
        })
      }
    })
  },

  //TODO: 这里对于扫码如果是条形码做一些特定的处理
  onScanClicked() {
    wx.scanCode({
      success: () => {
        wx.navigateTo({
          url: '/pages/register/register'
        })
      },
      fail: console.error,
    })
  },

  onShow() {
    this.isPageShowing = true
  },

  onHide() {
    this.isPageShowing = false
  },

  moveCars() {  //测试让车跑动
    const map = wx.createMapContext("map")
    const dest = {
      latitude: 23.099994,
      longitude: 113.324520,
    }

    const moveCar = () => {
      dest.latitude += 0.1
      dest.longitude += 0.1
      map.translateMarker({
        destination: {
          latitude: dest.latitude,
          longitude: dest.longitude,
        },
        markerId: 0,
        autoRotate: false,
        rotate: 0,
        duration: 5000,
        animationEnd: () => {
          if (this.isPageShowing) {
            moveCar()
          }
        }
      })
    }

    moveCar()
  }
})