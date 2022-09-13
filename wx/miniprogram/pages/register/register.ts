// pages/register/register.ts
Page({
  data: {
    licNo: '', //驾驶证号
    name: '',  //姓名
    birthDate: '1990-01-01',
    genderIndex: 0,
    genders: ['未知', '男', '女', '其他'],
    licImgURL: undefined as string | undefined,
    state: 'UNSUBMITTED' as 'UNSUBMITTED' | 'PENDING' | 'VERIFIED',//递交审查状态
    signImgURL: '' //完成审查后的对勾的URL
  },
  onLoadImg() {  //加载驾驶证图片,用于解析数据
    wx.chooseMedia({
      success: res => {
        if (res.tempFiles.length > 0) {
          this.setData({
            licImgURL: res.tempFiles[0].tempFilePath
          })
          //TODO: upload image  假想数据,后期对接后端
          setTimeout(() => {
            this.setData({
              licNo: '1509377123xx',
              name: 'ws',
              genderIndex: 1,
              birthDate: '1989-01-02'
            })
          })
        }
      },
    })
  },
  onGenderChange(e: any) {
    this.setData({
      genderIndex: e.detail.value,
    })
  },
  onBirthDataChange(e: any) {
    this.setData({
      birthDate: e.detail.value,
    })
  },
  //递交审查 TODO: 后续接入后端要进行修改
  onSubmit() {
    this.setData({
      state: 'PENDING',
    })

    //模拟返回
    setTimeout(() => {
      this.setData({
        state: 'VERIFIED',
        signImgURL: '/resources/check.png'
      })
    }, 30)

    wx.redirectTo({
      url: '/pages/lock/lock'
    })
  },
  //重新审查 TODO: 后面也需要接入后端
  onResubmit() {
    setTimeout(() => {
      this.setData({
        state: 'UNSUBMITTED',
        licImgURL: '',
      })
    })
  }
})