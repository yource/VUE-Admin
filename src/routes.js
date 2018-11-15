/** 带层级结构，代表菜单的嵌套 **/
const routes = [{
    path: '/',
    name: 'overview',
    name_cn: "概览",
    icon: "icon-xueqinggailan",
    rightLevel: 0,
    component: () => import( /* webpackChunkName: "overview" */ './views/overview.vue')
}, {
    path: '/table',
    name: 'table',
    name_cn: "表格",
    icon: "icon-biaoge",
    rightLevel: 0,
    component: () => import( /* webpackChunkName: "table" */ './views/table.vue')
}, {
    path: '/tree',
    name: 'tree',
    name_cn: "树状列表",
    icon: "icon-shuzhuangtu_o",
    rightLevel: 0,
    component: () => import( /* webpackChunkName: "tree" */ './views/tree.vue')
}, {
    path: '/todo',
    name: 'todo',
    name_cn: "事项安排",
    icon: "icon-todo_list",
    rightLevel: 0,
    component: () => import( /* webpackChunkName: "todo" */ './views/todo.vue')
}, {
    path: '/message',
    name: 'message',
    name_cn: "消息通知",
    icon: "icon-message",
    rightLevel: 0,
    component: () => import( /* webpackChunkName: "message" */ './views/message.vue')
}, {
    name: 'user',
    name_cn: "人员信息",
    icon: "icon-icon-user",
    rightLevel: 0,
    routes: [{
        path: '/user/userlist',
        name: 'userlist',
        name_cn: "用户列表",
        rightLevel: 0,
        component: () => import( /* webpackChunkName: "user" */ './views/userlist.vue')
    }, {
        path: '/user/myinfo',
        name: 'myinfo',
        name_cn: "个人信息",
        rightLevel: 0,
        component: () => import( /* webpackChunkName: "user" */ './views/myinfo.vue')
    }]
}, {
    name: "error",
    name_cn: "错误页面",
    icon: "icon-bug",
    rightLevel: 0,
    routes: [{
        path: '/error/404',
        name: '404',
        name_cn: "404错误",
        rightLevel: 0,
        component: () => import( /* webpackChunkName: "error" */ './views/404.vue')
    }, {
        path: '/error/noRight',
        name: 'noRight',
        name_cn: "无权限",
        rightLevel: 0,
        component: () => import( /* webpackChunkName: "error" */ './views/noRight.vue')
    }]
}, {
    path: '/about',
    name: 'about',
    name_cn: "关于系统",
    icon: "icon-aboutus",
    rightLevel: 0,
    component: () => import( /* webpackChunkName: "about" */ './views/about.vue')
}];

/** 转成一维数组，共vue-router使用 **/
const routeArray = [];

function getRoutes(route) {
    route.map(function(item) {
        if (item.path) {
            routeArray.push(item)
        } else {
            getRoutes(item.routes)
        }
    })
}
getRoutes(routes);

export { routes, routeArray };