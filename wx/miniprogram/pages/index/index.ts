import { ProfileService } from "../../service/profile"
import { rental } from "../../service/proto_gen/rental/rental_pb"
import { TripService } from "../../service/trip"
import { routing } from "../../utils/routing"

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
    ],
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

  //处理扫码动作
  async onScanClicked() {
    //验证当前是否已经有行程在进行
    // const trips = await TripService.GetTrips(rental.v1.TripStatus.IN_PROGRESS)

    // if (((trips.trips?.length) || 0) > 0) {
    //   await this.selectComponent('#tripModal').showModal()
    //   wx.navigateTo({
    //     url: routing.drving({
    //       trip_id: trips.trips![0].id!,
    //     })
    //   })
    //   return
    // }

    wx.scanCode({
      success: async () => {
        //TODO: 模拟获取car_id  为了方便后续页面接入(是否还需要再包装)
        const carID = '633fe74af1c33f573d512450'
        const lockURL = routing.lock({
          car_id: carID
        })

        const prof = await ProfileService.getProfile()

        // 判断是否已经验证过驾驶证信息
        if (prof.identityStatus === rental.v1.IdentityStatus.VERIFIED) {
          wx.navigateTo({
            url: lockURL,
          })
        } else {
          await this.selectComponent('#licModal').showModal()
          this.setData({
            showModal: true,
          })

          wx.navigateTo({
            url: routing.register({
              redirectURL: lockURL,
            })
          })
        }
      },
      fail: res => {
        console.log(res)
        //针对错误特定处理
        this.detailErrMsg(res)
      },
    })
  },

  detailErrMsg(res: WechatMiniprogram.GeneralCallbackResult) {
    if (res.errMsg === "scanCode:fail") {  //special detail
      wx.showToast({
        icon: 'none',
        title: '请扫描正确二维码',
      })
    }
  },

  onShow() {
    this.isPageShowing = true
  },

  onHide() {
    this.isPageShowing = false
  },

  onMyTripsTip() {
    wx.navigateTo({
      url: routing.mytrips(),
    })
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
  },
})