"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_1 = require("../../utils/routing");
const shareLocationKey = "share_Location";
// pages/lock/lock.ts
Page({
    trip_id: '',
    data: {
        shareLocation: false,
        avatarURL: '',
    },
    onLoad(opt) {
        const o = opt;
        if (o.car_id) {
            this.trip_id = decodeURIComponent(opt.car_id);
        }
    },
    onChooseAvatar(e) {
        this.setData({
            avatarURL: e.detail.avatarUrl,
            shareLocation: wx.getStorageSync(shareLocationKey) || true
        });
    },
    onShareLocation(e) {
        this.data.shareLocation = e.detail.value;
        wx.setStorageSync(shareLocationKey, shareLocation);
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
                });
                //成功后,开锁
                wx.showLoading({
                    title: '开锁中',
                    mask: true,
                });
                //这里我要知道我开的是哪辆车的锁才回去跳转
                console.log("unlocking car", this.trip_id);
                setTimeout(() => {
                    wx.redirectTo({
                        url: routing_1.routing.drving({
                            trip_id: this.trip_id
                        }),
                        complete: () => {
                            wx.hideLoading();
                        }
                    });
                }, 500);
            },
            fail: () => {
                console.error,
                    wx.showToast({
                        icon: 'none',
                        title: '请前往设置页授权位置信息',
                    });
            }
        });
    }
});
