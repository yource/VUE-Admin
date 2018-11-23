# vue-admin-system

![logo](https://raw.githubusercontent.com/yource/Vue-Admin-System/master/src/assets/images/logo.png)
基于vue-cli3。 
技术栈：vue + vuex + vue-router + axios + element-ui + scss  + mockjs 

---

## 文件结构

没有设置独立的api文件和文件夹，ajax直接写在.vue组件里，避免过度解耦，增大项目复杂度。
vuex多用mutation，少用action，异步操作在组件里完成后再同步到store状态树，这样数据流程更直接。

```
+ public 此文件夹内的文件会在打包时直接复制
+ src 
  - assets 图片和css文件
  - componets 组件
  - mock 接口模拟
  - store vuex状态管理
  - utils 额外工具，包含实用的js方法
  - views vue-router页面的根组件
  - App.vue 根组件
  - main.js 入口文件
  - routes.js 路由文件

```

在src/assets/css/theme.scss文件中可以定义scss变量，全局有效。

## 项目配置

在vue.config.js中进行项目配置，除了baseUrl、lintOnSave等vue-cli自带的配置外，增加了个PROD_URL，代表测试环境的ip地址。
当PROD_URL为空字符串时，进行npm run serve时会启动mockjs，来模拟ajax接口的返回值。当配置了PROD_URL时，会通过devServer的proxy跨域调用接口。

```
// 测试环境的域名，默认为""
const PROD_URL = "";

module.exports = {
    lintOnSave: false,
    // ...
}
```
![overview](https://raw.githubusercontent.com/yource/Vue-Admin-System/master/src/assets/images/overview.jpg)





