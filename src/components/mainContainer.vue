<template>
    <div class="mainContainer">
        <div class="tabs">
            <el-scrollbar class="tabsScroll">
                <ul>
                    <li v-for="route in pageList" @click="changeActiveMenu(route)" :key="route" :class="{'active':$route.name==route}">
                        <span>{{getRouteName(route)}}</span>
                        <i v-if="route!='overview'" class="el-icon-close" @click.stop="removePage(route)"></i>
                    </li>
                </ul>
            </el-scrollbar>
            <div class="closeTabs" @click="closeTabs">
                <el-tooltip effect="dark" content="关闭标签" placement="bottom">
                    <i class="el-icon-circle-close"></i>
                </el-tooltip>
            </div>
        </div>
        <el-scrollbar class="routerView">
            <router-view></router-view>
        </el-scrollbar>
    </div>
</template>
<script>
import { routeArray } from "@/routes";
export default {
    name: 'mainContainer',
    data() {
        return {
            pageList: ["overview"]
        }
    },
    methods: {
        // 点击标签页，切换显示的页面  
        changeActiveMenu(route) {
            if (route != this.$route.name) {
                this.$router.push({ name: route })
            }
        },
        // 关闭单个标签页
        removePage(route) {
            if (route == this.$route.name) {
                this.$router.push({ name: this.pageList[this.pageList.indexOf(route) - 1] })
            }
            this.pageList.splice(this.pageList.indexOf(route), 1);
        },
        // 关闭所有标签页
        closeTabs() {
            if (this.$route.name == "overview") {
                this.pageList = ["overview"]
            } else {
                this.pageList = ["overview", this.$route.name]
            }
        },
        // 获取route对应的中文名，显示在标签上
        getRouteName(routeName) {
            var name_cn = "";
            routeArray.map(function(route) {
                if (route.name == routeName) {
                    name_cn = route.name_cn
                }
            });
            return name_cn;
        }
    },
    watch: {
        // 监听路由变化，改变标签的显示
        '$route': function(route) {
            if (this.pageList.indexOf(route.name) < 0) {
                this.pageList.push(route.name);
            }
        },
        // 实时计算标签总长度，防止标签换行
        'pageList': function(newPageList) {
            this.$nextTick().then(function() {
                let tabsWidth = 0;
                let tabs = document.querySelectorAll(".mainContainer .tabs .el-scrollbar__view>ul>li");
                for (let i = 0; i < tabs.length; i++) {
                    tabsWidth += tabs[i].offsetWidth
                }
                var move = tabsWidth + 2 - document.querySelector(".mainContainer .tabs .el-scrollbar__wrap").offsetWidth;
                if (move > 0) {
                    document.querySelector(".mainContainer .tabs .el-scrollbar__view").style.width = tabsWidth + 5 + "px";
                    document.querySelector(".mainContainer .tabs .el-scrollbar__wrap").scrollLeft = move + 5;
                }
            })
        }
    }
}
</script>
<style scoped lang="scss">
.mainContainer {
    height: 100%;
    overflow: hidden;
}

.tabs {
    height: 35px;
    padding-top: 5px;
    padding-left: 15px;
    background: #e0e4ef;
    position: relative;
    border-bottom: 1px solid #ced5e5;
}

.closeTabs {
    position: absolute;
    right: 10px;
    top: 3px;
    height: 30px;
    width: 30px;
    font-size: 26px;
    line-height: 30px;
    color: #abb0bf;

    >i {
        cursor: pointer;

        &:hover {
            color: #50506f;
        }
    }
}

.tabsScroll {
    width: calc(100% - 45px);
    height: 35px;
}

.tabs ul {
    overflow-y: hidden;

    >li {
        display: inline-block;
        border: 1px solid #ced5e5;
        border-bottom: none;
        border-left: none;
        height: 29px;
        line-height: 30px;
        padding: 0 6px;
        background: #edf0f9;
        cursor: pointer;
        &:first-child{
            border-left: 1px solid #ced5e5;
        }
        span {
            padding: 0 6px;

            &:hover {
                color: #29a26c;
            }
        }

        &.active {
            background: #fff;

            span {
                color: #29a26c;
            }
        }

        .el-icon-close {
            font-weight: bold;
            color: #ccc;

            &:hover {
                color: red;
            }
        }
    }
}

.routerView {
    height: calc(100% - 65px);
    width: calc(100% - 30px);
    background: #fff;
    margin: 15px auto 0;
    box-shadow: 0 2px 8px #c8c7d2;
}
</style>