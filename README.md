# coolcar
This is a car rental applet front-end code.


## 目录
    wx:微信小程序
        colorui   //外部css组件库
        weui      //外部css组件库
        miniprogram
            pages  //所有页面
                driving  行驶记录页面,用于计费和处理时间
                index    用户首页
                lock     开锁页面
                register 注册信息页面
                pay      支付页面
                mytrips  我的行程页面
        resources //外部图片资源
        utils     //维护路由,和自定义各种实现的api方法

    server:服务后台
        proto  pb协议文件

    admin:后台管理
    deployment:部署脚本 (k8s配置)
    miniprogram:前端工作目录(目前小程序内置ts转js)

## 如何编译以及运行小程序
    cd wx
    npm install