"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let resolveUserInfo;
let rejectUserInfo;
// app.ts
App({
    globalData: {
        userInfo: new Promise((resolve, reject) => {
            resolveUserInfo = resolve;
            rejectUserInfo = reject;
        })
    },
    async onLaunch() {
        // 登录
        // 获取用户信息
        try {
        }
        catch (err) {
            rejectUserInfo(err);
        }
    },
    resolveUserInfo(userInfo) {
        resolveUserInfo(userInfo);
    }
});
