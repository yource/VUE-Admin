// 引入初始化样式
import './assets/css/default.css';
// 引入element样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入自定义样式
import './assets/css/style.css';

import Vue from 'vue';
import Router from 'vue-router'
import ElementUI from 'element-ui';
import App from './App.vue';
import { routeArray } from './routes';
import store from './store/';

/* 在实例上挂载ajax方法
 * 测试环境的url需要配置到.env.production文件中 */
import axios from 'axios';
const axiosOpt = {
    timeout: 10000
}

if (!!process.env.PROD_URL) {
    axiosOpt.baseURL = process.env.PROD_URL
}
Vue.prototype.$ajax = axios.create(axiosOpt);

Vue.use(ElementUI);
Vue.use(Router);
Vue.config.productionTip = false;

new Vue({
    router: new Router({
        mode: 'history',
        base: process.env.BASE_URL,
        routes: routeArray
    }),
    store,
    render: h => h(App)
}).$mount('#app')