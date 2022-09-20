"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
App({
    globalData: {},
    onLaunch() {
        // 请求
        wx.request({
            url: 'http://localhost:8080/trip/trip123',
            method: 'GET',
            success: console.log,
            fail: console.error,
        });
        // 登录
        wx.login({
            success: res => {
                console.log(res.code);
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            },
        });
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
});
