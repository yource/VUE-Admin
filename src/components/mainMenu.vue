<template>
    <div class="asideMenu">
        <el-scrollbar class="scrollbar">
            <el-menu :default-active="$route.name" class="asideMenuCon" :collapse="isCollapse" background-color="#38374a" text-color="rgb(226, 226, 232)" active-text-color="rgb(98,224,168)" :unique-opened="true">
                <div v-for="route in routes">
                    <el-submenu v-if="route.routes" :index="route.name" :key="route.name">
                        <template slot="title">
                            <i class="iconfont" :class="route.icon"></i>
                            <span>{{route.name_cn}}</span>
                        </template>
                        <el-menu-item v-for="subRoute in route.routes" :index="subRoute.name" :key="subRoute.name" @click="changeRoute(subRoute)">
                            {{subRoute.name_cn}}
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-if="!route.routes" :index="route.name" :key="route.name" @click="changeRoute(route)">
                        <i class="iconfont" :class="route.icon"></i>
                        <span slot="title">{{route.name_cn}}</span>
                    </el-menu-item>
                </div>
            </el-menu>
        </el-scrollbar>
        <div class="collapseButton" @click="collapse" :title="isCollapse?'展开菜单':'收起菜单'">
            <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
        </div>
    </div>
</template>
<script>
import {routes} from "@/routes.js"
export default {
    name: 'mianMenu',
    data: () => ({
        routes
    }),
    computed: {
        isCollapse() {
            return !this.$store.state.expandMenu;
        }
    },
    methods: {
        collapse() {
            this.$store.commit('changeExpandMenu')
        },
        changeRoute(route){
            if(route.name!=this.$route.name){
                this.$router.push(route.path)
            }
        }
    }
}
</script>
<style scoped lang="scss">
.scrollbar {
    height: calc(100vh - 80px);
    background: #38374a;
}

.collapseButton {
    height: 25px;
    line-height: 25px;
    font-size: 18px;
    color: #c3c8d2;
    text-align: center;
    background: #2c2c3c;
    cursor: pointer;

    &:hover {
        color: #62e0a8;
    }
}

.asideMenuCon:not(.el-menu--collapse) {
    width: 190px;
}

.asideMenu.el-menu .el-menu-item,
.el-submenu__title {
    height: 50px;
    line-height: 50px;
}

.asideMenuCon .iconfont {
    font-size: 18px;
}

.asideMenuCon.el-menu--collapse {
    width: 50px;
}

.el-menu-item i,
.el-submenu__title i {
    color: #c3c8d2;
}

.asideMenuCon.el-menu .el-menu-item span,
.asideMenuCon.el-menu .el-submenu__title span {
    margin-left: 10px;
}
</style>