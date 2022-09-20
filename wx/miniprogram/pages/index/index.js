"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_1 = require("../../utils/routing");
Page({
    isPageShowing: false,
    data: {
        avatarURL: '',
        setting: {
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
                joinCluster: true,
                width: 20,
                height: 20,
            },
            {
                iconPath: "/resources/car.png",
                id: 1,
                latitude: 23.099994,
                longitude: 114.324520,
                joinCluster: true,
                width: 20,
                height: 20,
            },
            {
                iconPath: "/resources/car.png",
                id: 2,
                latitude: 29.756825521115363,
                longitude: 121.87222114786053,
                joinCluster: true,
                width: 20,
                height: 20,
            },
        ],
    },
    onLoad() {
        wx.getUserProfile({
            desc: '用于完善会员资料',
            success: (res) => {
                console.log(res.userInfo.avatarUrl);
                this.setData({
                    avatarURL: res.userInfo.avatarUrl,
                });
            }
        });
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
                });
            },
            fail: () => {
                wx.showToast({
                    icon: 'none',
                    title: '请勿频繁查询定位'
                });
            }
        });
    },
    //处理扫码动作
    onScanClicked() {
        wx.scanCode({
            success: async () => {
                await this.selectComponent('#licModal').showModal();
                this.setData({
                    showModal: true,
                });
                //TODO: 模拟获取car_id  为了方便后续页面接入(是否还需要再包装)
                const carID = 'car123';
                const redirectURL = routing_1.routing.lock({
                    car_id: carID
                });
                wx.navigateTo({
                    url: routing_1.routing.register({
                        redirectURL: redirectURL,
                    })
                });
            },
            fail: res => {
                console.log(res);
                //针对错误特定处理
                this.detailErrMsg(res);
            },
        });
    },
    detailErrMsg(res) {
        if (res.errMsg === "scanCode:fail") { //special detail
            wx.showToast({
                icon: 'none',
                title: '请扫描正确二维码',
            });
        }
    },
    onShow() {
        this.isPageShowing = true;
    },
    onHide() {
        this.isPageShowing = false;
    },
    onMyTripsTip() {
        wx.navigateTo({
            url: routing_1.routing.mytrips(),
        });
    },
    moveCars() {
        const map = wx.createMapContext("map");
        const dest = {
            latitude: 23.099994,
            longitude: 113.324520,
        };
        const moveCar = () => {
            dest.latitude += 0.1;
            dest.longitude += 0.1;
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
                        moveCar();
                    }
                }
            });
        };
        moveCar();
    },
});
