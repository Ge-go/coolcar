"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// pages/register/register.ts
Page({
    redirectURL: '',
    data: {
        licNo: '',
        name: '',
        birthDate: '1990-01-01',
        genderIndex: 0,
        genders: ['未知', '男', '女', '其他'],
        licImgURL: undefined,
        state: 'UNSUBMITTED',
        signImgURL: '' //完成审查后的对勾的URL
    },
    onLoad(opt) {
        const o = opt;
        if (o.redirect) {
            this.redirectURL = decodeURIComponent(o.redirect);
        }
    },
    onLoadImg() {
        wx.chooseMedia({
            success: res => {
                if (res.tempFiles.length > 0) {
                    this.setData({
                        licImgURL: res.tempFiles[0].tempFilePath
                    });
                    //TODO: upload image  假想数据,后期对接后端
                    setTimeout(() => {
                        this.setData({
                            licNo: '1509377123xx',
                            name: 'ws',
                            genderIndex: 1,
                            birthDate: '1989-01-02'
                        });
                    });
                }
            },
        });
    },
    onGenderChange(e) {
        this.setData({
            genderIndex: e.detail.value,
        });
    },
    onBirthDataChange(e) {
        this.setData({
            birthDate: e.detail.value,
        });
    },
    //递交审查 TODO: 后续接入后端要进行修改
    onSubmit() {
        this.setData({
            state: 'PENDING',
        });
        //模拟返回
        setTimeout(() => {
            this.setData({
                state: 'VERIFIED',
                signImgURL: '/resources/check.png'
            });
        }, 30);
        if (this.redirectURL) {
            console.log(this.redirectURL);
            wx.redirectTo({
                url: this.redirectURL
            });
        }
    },
    //重新审查 TODO: 后面也需要接入后端
    onResubmit() {
        setTimeout(() => {
            this.setData({
                state: 'UNSUBMITTED',
                licImgURL: '',
            });
        });
    }
});
