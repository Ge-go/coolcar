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
            miniprogram_npm  //存放dependencies中的资源存放地,会被打包发到客户端
        resources //外部图片资源
        utils     //维护路由,和自定义各种实现的api方法

    server:服务后台
    admin:后台管理
    deployment:部署脚本 (k8s配置)
    miniprogram:前端工作目录(目前小程序内置ts转js)
    architectureDiagram:架构图存放位置
    extra:部分原来的代码存放地

## 如何编译以及运行小程序
    cd wx/miniprogram
    npm install
    点击工具构建npm
    点击编译

    后端服务直接启动即可,gateway以及grpc各个模块服务启动无先后顺序之分

## 整体服务架构
![微服务架构图](../coolcar/architectureDiagram/wfw.png)