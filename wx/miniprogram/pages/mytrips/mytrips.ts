import { IAppOption } from "../../appoption"
import { routing } from "../../utils/routing"

interface Trip {
  id: string
  shortId: string
  start: string
  end: string
  duration: string
  fee: string
  distance: string
  status: string
  //inProgress: boolean
}

interface MainItem {
  id: string
  navId: string
  navScrollId: string
  data: Trip
}

interface NavItem {
  id: string
  mainId: string
  label: string
}

interface MainItemQueryResult {
  id: string
  top: number
  dataset: {
    navId: string
    navScrollId: string
  }
}

// const tripStatusMap = new Map([
//   [rental.v1.TripStatus.IN_PROGRESS, '进行中'],
//   [rental.v1.TripStatus.FINISHED, '已完成'],
// ])

// const licStatusMap = new Map([
//   [rental.v1.IdentityStatus.UNSUBMITTED, '未认证'],
//   [rental.v1.IdentityStatus.PENDING, '未认证'],
//   [rental.v1.IdentityStatus.VERIFIED, '已认证'],
// ])

Page({
  scrollStates: {
    mainItems: [] as MainItemQueryResult[],
  },

  layoutResolver: undefined as (() => void) | undefined,

  data: {
    promotionItems: [
      {
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cdntest.csair.com%2Fcn%2Ftourguide%2Fbefore_ready%2Fdestination%2Fdestination%2Fzhengzhou%2Fresource%2F517911e56449995c589463cfa79d9ac9.jpg&refer=http%3A%2F%2Fwww.cdntest.csair.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666001850&t=0c81e34cc10711f05c63ed2a1072f815',
        promotionID: 1,
      },
      {
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww2.sinaimg.cn%2Fmw690%2F005E7Pvwly1h467hy02pjj31hc0tn7tr.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666001816&t=a26d32c29fc07fa08163e491edc8c74a',
        promotionID: 2,
      },
      {
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fmediabluk.cnr.cn%2Fimg%2Fcnr%2FCNRCDP%2F2021%2F0914%2Fa5af1b18e16f2163158344135310238710.jpg%3Fauth%3D04dfb7363694d8c44c930f84c1d5dee1&refer=http%3A%2F%2Fmediabluk.cnr.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666001831&t=7ba5e43b9c0e68e40067b7b1a2868a2b',
        promotionID: 3,
      },
      {
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cdntest.csair.com%2Fcn%2Ftourguide%2Fbefore_ready%2Fdestination%2Fdestination%2Fzhengzhou%2Fresource%2F517911e56449995c589463cfa79d9ac9.jpg&refer=http%3A%2F%2Fwww.cdntest.csair.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666001850&t=0c81e34cc10711f05c63ed2a1072f815',
        promotionID: 4,
      },
    ],
    //licStatus: licStatusMap.get(rental.v1.IdentityStatus.UNSUBMITTED),
    avatarURL: '',
    tripsHeight: 0,
    navCount: 0,
    mainItems: [] as MainItem[],
    mainScroll: '',
    navItems: [] as NavItem[],
    navSel: '',
    navScroll: '',
  },

  onLoad() {
    // const layoutReady = new Promise(() => {
    //   //TODO: 这里尚未改动
    //   this.layoutResolver = undefined
    // })
    // Promise.all([TripService.getTrips(), layoutReady]).then(([trips]) => {
    //   this.populateTrips(trips.trips!)
    // })
    getApp<IAppOption>().globalData.userInfo.then(userInfo => {
      this.setData({
        avatarURL: userInfo.avatarUrl,
      })
    })
  },

  onShow() {
    // ProfileService.getProfile().then(p => {
    //   this.setData({
    //     licStatus: licStatusMap.get(p.identityStatus || 0),
    //   })
    // })
  },

  onReady() {
    wx.createSelectorQuery().select('#heading')
      .boundingClientRect(rect => {
        const height = wx.getSystemInfoSync().windowHeight - rect.height
        this.setData({
          tripsHeight: height,
          navCount: Math.round(height / 50),
        }, () => {
          if (this.layoutResolver) {
            this.layoutResolver()
          }
        })
      }).exec()
  },

  // populateTrips(trips: rental.v1.ITripEntity[]) {
  //   const mainItems: MainItem[] = []
  //   const navItems: NavItem[] = []
  //   let navSel = ''
  //   let prevNav = ''
  //   for (let i = 0; i < trips.length; i++) {
  //     const trip = trips[i]
  //     const mainId = 'main-' + i
  //     const navId = 'nav-' + i
  //     const shortId = trip.id?.substr(trip.id.length - 6)
  //     if (!prevNav) {
  //       prevNav = navId
  //     }
  //     const tripData: Trip = {
  //       id: trip.id!,
  //       shortId: '****' + shortId,
  //       start: trip.trip?.start?.poiName || '未知',
  //       end: '',
  //       distance: '',
  //       duration: '',
  //       fee: '',
  //       status: tripStatusMap.get(trip.trip?.status!) || '未知',
  //       //inProgress: trip.trip?.status === rental.v1.TripStatus.IN_PROGRESS,
  //     }
  //     const end = trip.trip?.end
  //     if (end) {
  //       tripData.end = end.poiName || '未知',
  //         tripData.distance = end.kmDriven?.toFixed(1) + '公里',
  //         tripData.fee = formatFee(end.feeCent || 0)
  //       const dur = formatDuration((end.timestampSec || 0) - (trip.trip?.start?.timestampSec || 0))
  //       tripData.duration = `${dur.hh}时${dur.mm}分`
  //     }
  //     mainItems.push({
  //       id: mainId,
  //       navId: navId,
  //       navScrollId: prevNav,
  //       data: tripData,
  //     })
  //     navItems.push({
  //       id: navId,
  //       mainId: mainId,
  //       label: shortId || '',
  //     })
  //     if (i === 0) {
  //       navSel = navId
  //     }
  //     prevNav = navId
  //   }
  //   for (let i = 0; i < this.data.navCount - 1; i++) {
  //     navItems.push({
  //       id: '',
  //       mainId: '',
  //       label: '',
  //     })
  //   }
  //   this.setData({
  //     mainItems,
  //     navItems,
  //     navSel,
  //   }, () => {
  //     this.prepareScrollStates()
  //   })
  // },

  prepareScrollStates() {
    wx.createSelectorQuery().selectAll('.main-item')
      .fields({
        id: true,
        dataset: true,
        rect: true,
      }).exec(res => {
        this.scrollStates.mainItems = res[0]
      })
  },

  onPromotionItemTap(e: any) {
    const promotionID: number = e.currentTarget.dataset.promotionId
    if (promotionID) {
      console.log('claiming promotion', promotionID)
    }
  },

  onGetUserInfo(e: any) {
    const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
    if (userInfo) {
      getApp<IAppOption>().resolveUserInfo(userInfo)
      this.setData({
        avatarURL: userInfo.avatarUrl,
      })
    }
  },

  onRegisterTap() {
    wx.navigateTo({
      url: routing.register(),
    })
  },

  onNavItemTap(e: any) {
    const mainId: string = e.currentTarget?.dataset?.mainId
    const navId: string = e.currentTarget?.id
    if (mainId && navId) {
      this.setData({
        mainScroll: mainId,
        navSel: navId,
      })
    }
  },

  onMainScroll(e: any) {
    const top: number = e.currentTarget?.offsetTop + e.detail?.scrollTop
    if (top === undefined) {
      return
    }

    const selItem = this.scrollStates.mainItems.find(
      v => v.top >= top)
    if (!selItem) {
      return
    }

    this.setData({
      navSel: selItem.dataset.navId,
      navScroll: selItem.dataset.navScrollId,
    })
  },

  onMianItemTap(e: any) {
    if (!e.currentTarget.dataset.tripInProgress) {
      return
    }
    const tripId = e.currentTarget.dataset.tripId
    if (tripId) {
      wx.redirectTo({
        url: routing.drving({
          trip_id: tripId,
        }),
      })
    }
  }
})
