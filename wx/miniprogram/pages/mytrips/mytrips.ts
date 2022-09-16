import { routing } from "../../utils/routing"
// pages/mytrips/mytrips.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    promotionItems: [
      {
        img: 'https://www.yebaike.com/d/file/20210817/f40c60f736a4cd977cea2eaa85980770.jpg',
        promotionID: 1,
      },
      {
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.lanrentuku.com%2F2020%2F7%2F11%2Fe23bfa96-6f7c-4c05-b4e7-0ee93d656d9f.jpg&refer=http%3A%2F%2Fi-1.lanrentuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665907691&t=c06f1a6c12b16aecfaeba4cd05b0272e',
        promotionID: 2,
      },
      {
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdpic.tiankong.com%2Fhg%2Fhg%2FQJ9108957161.jpg&refer=http%3A%2F%2Fdpic.tiankong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665907714&t=be870ca36b36c69fd27c9acf683ebb1d',
        promotionID: 3,
      },
      {
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F210611094Q512b-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665907756&t=3f206c26e17aa97091a1c6237d37ed23',
        promotionID: 4,
      },
    ],
    //licStatus: licStatusMap.get(rental.v1.IdentityStatus.UNSUBMITTED),
    avatarURL: '',
    tripsHeight: 0,
    navCount: 0,
    //mainItems: [] as MainItem[],
    mainScroll: '',
    //navItems: [] as NavItem[],
    navSel: '',
    navScroll: '',
  },

  onPromotionItemTap(e: any) {
    const promotionID: number = e.currentTarget.dataset.promotionId
    if (promotionID) {
      console.log('claiming promotion', promotionID)
    }
  },

  onRegisterTap() {
    wx.navigateTo({
        url: routing.register(),
    })
},
})