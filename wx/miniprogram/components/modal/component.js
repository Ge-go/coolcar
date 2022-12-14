"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        showModal: Boolean,
        showCancel: Boolean,
        title: String,
        contents: String,
    },
    options: {
        addGlobalClass: true,
    },
    /**
     * 组件的初始数据
     */
    data: {
        resolve: undefined
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onCancel() {
            this.hideModal('cancel');
        },
        onOK() {
            this.hideModal('ok');
        },
        hideModal(res) {
            this.setData({
                showModal: false,
            });
            this.triggerEvent(res);
            if (this.data.resolve) {
                this.data.resolve(res);
            }
        },
        showModal() {
            this.setData({
                showModal: true,
            });
            return new Promise((resolve) => {
                this.data.resolve = resolve;
            });
        }
    }
});
