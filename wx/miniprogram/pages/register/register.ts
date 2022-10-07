import { ProfileService } from "../../service/profile"
import { rental } from "../../service/proto_gen/rental/rental_pb"
import { Coolcar } from "../../service/request"
import { padString } from "../../utils/format"
import { routing } from "../../utils/routing"

function formatDate(millis: number) {
  const dt = new Date(millis)
  const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const d = dt.getDate()

  return `${padString(y)}-${padString(m)}-${padString(d)}`
}

// pages/register/register.ts
Page({
  redirectURL: '', //要跳转的路径
  profileRefresher: 0,

  data: {
    licNo: '', //驾驶证号
    name: '',  //姓名
    birthDate: '1990-01-01',
    genderIndex: 0,
    genders: ['未知', '男', '女', '其他'],
    licImgURL: undefined as string | undefined,
    state: rental.v1.IdentityStatus[rental.v1.IdentityStatus.UNSUBMITTED],//递交审查状态
    signImgURL: '' //完成审查后的对勾的URL
  },

  renderProfile(p: rental.v1.IProfile) {
    this.renderIdentity(p.identity!)
    this.setData({
      state: rental.v1.IdentityStatus[p.identityStatus || 0]
    })
  },

  renderIdentity(i?: rental.v1.IIdentity) {
    this.setData({
      licNo: i?.licNumber || '',
      name: i?.name || '',
      genderIndex: i?.gender || 0,
      birthDate: formatDate(i?.birthDateMillis || 0),
    })
  },

  onLoad(opt: Record<'redirect', string>) {
    const o: routing.RegisterOpts = opt
    if (o.redirect) {
      this.redirectURL = decodeURIComponent(o.redirect)
    }
    ProfileService.getProfile().then(p => this.renderProfile(p))
    ProfileService.getProfilePhoto().then(p => {
      this.setData({
        signImgURL: '/resources/check.png',
        licImgURL: p.url || '',
      })
    })
  },

  onLoadImg() {  //加载驾驶证图片,用于解析数据
    wx.chooseMedia({
      success: async res => {
        if (res.tempFiles.length === 0) {
          return
        }
        this.setData({
          licImgURL: res.tempFiles[0].tempFilePath
        })
        //创建profile
        const photoRes = await ProfileService.createProfilePhoto()
        if (!photoRes.uploadUrl) {
          return
        }
        // 上传照片
        await Coolcar.uploadfile({
          localPath: res.tempFiles[0].tempFilePath,
          url: photoRes.uploadUrl || '',
        })
        const identity = await ProfileService.completeProfilePhoto()
        this.renderIdentity(identity)
      },
    })
  },
  onGenderChange(e: any) {
    this.setData({
      genderIndex: parseInt(e.detail.value),
    })
  },
  onBirthDataChange(e: any) {
    this.setData({
      birthDate: e.detail.value,
    })
  },
  //递交审查 TODO: 后续接入后端要进行修改
  onSubmit() {
    ProfileService.submitProfile({
      licNumber: this.data.licNo,
      name: this.data.name,
      gender: this.data.genderIndex,
      birthDateMillis: Date.parse(this.data.birthDate),
    }).then(p => {
      this.renderProfile(p)
      this.scheduleProfileRefresher()
    })

    // if (this.redirectURL) {
    //   console.log(this.redirectURL)
    //   wx.redirectTo({
    //     url: this.redirectURL
    //   })
    // }
  },
  //重新审查 TODO: 后面也需要接入后端
  onResubmit() {
    ProfileService.clearProfile().then(p => {
      this.renderProfile(p)
    })
    ProfileService.clearProfilePhoto().then(() => {
      this.setData(
        { licImgURL: '' }
      )
    })
  },

  onUnload() {
    this.clearProfileRefresher()
  },

  // 轮询获取验证驾驶照片状态
  scheduleProfileRefresher() {
    this.profileRefresher = setInterval(() => {
      ProfileService.getProfile().then(p => {
        this.renderProfile(p)
        if (p.identityStatus !== rental.v1.IdentityStatus.PENDING) {
          this.clearProfileRefresher()
        }
        if (p.identityStatus === rental.v1.IdentityStatus.VERIFIED) {
          this.setData({
            signImgURL: '/resources/check.png',
            state: rental.v1.IdentityStatus[rental.v1.IdentityStatus.VERIFIED],
          })
          this.onLicVerified()
        }
      })
    }, 1000)
  },

  clearProfileRefresher() {
    if (this.profileRefresher) {
      clearInterval(this.profileRefresher)
      this.profileRefresher = 0
    }
  },

  onLicVerified() {
    if (this.redirectURL) {
      wx.redirectTo({
        url: this.redirectURL,
      })
    }
  },

  //绑定空函数,解决model报错问题
  fakeCallback() { }
})