<template>
    <div class="overview">
        <section>
            <div class="welcome">
                <img src="@/assets/images/user01.png" class="userPic" @click="$router.push({name:'myinfo'})">
                <p>欢迎超级管理员！</p>
                <p>今天是您工作的第199天。</p>
            </div>
            <ul class="numItems">
                <li style="color:rgb(255, 134, 86)">
                    <i class="iconfont icon-fangwen"></i>
                    <div>
                        <h3>12648</h3>
                        <p>用户访问量</p>
                    </div>
                </li>
                <li style="color:#6caee8">
                    <i class="iconfont icon-zhangdan"></i>
                    <div>
                        <h3>69307</h3>
                        <p>日流水</p>
                    </div>
                </li>
                <li style="color:#f9ac1b">
                    <i class="iconfont icon-yonghu"></i>
                    <div>
                        <h3>934156</h3>
                        <p>总用户量</p>
                    </div>
                </li>
            </ul>
            <div class="todolist">
                <div class="sectionTitle">
                    <span>待办事项</span>
                    <i title="更多" class="el-icon-d-arrow-right" @click="$router.push({name:'todo'})"></i>
                </div>
                <ul>
                    <li v-for="(item,index) in todolist" v-if="index<5">
                        <div>
                            <i :class="item.done?'el-icon-circle-check':'el-icon-circle-check-outline'" @click="item.done=!item.done"></i>
                            <span class="ellipsis" :class="{'checked':item.done}">{{item.content}}</span>
                            <el-popover placement="left" v-model="item.showDel">
                                <p style="line-height: 30px;">删除此条事项？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="item.showDel = false">取消</el-button>
                                    <el-button type="text" size="mini" @click="item.showDel = false;deleteTodo(item.id)">确定</el-button>
                                </div>
                                <i slot="reference" class="el-icon-delete"></i>
                            </el-popover>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <div id="chart" :style="{height:chartHeight+'px'}"></div>
    </div>
</template>
<script>
// 获取前15天的日期
function getMonthDate() {
    var month = [];
    var now = new Date();
    for (let i = 1; i < 16; i++) {
        now.setDate(now.getDate() - 1);
        month.push(now.getMonth() + 1 + "月" + now.getDate() + "日")
    }
    return month.reverse();
}

export default {
    name: 'overview',
    data: () => ({
        chartHeight: 300,
        chart: null,
        deleteVisible: false
    }),
    computed: {
        isCollapse() {
            return !this.$store.state.menu.expandMenu;
        },
        chartData() {
            return this.$store.state.overview.chartData;
        },
        todolist() {
            return this.$store.state.todo.todoList
        }
    },
    methods: {
        deleteTodo(id) {
            this.$store.commit('deleteTodo', id)
        },
        changeTodo(done) {
            this.$store.commit('changeTodo', done)
        },
        chartResize() {
            this.chartHeight = document.getElementById("routerView").offsetHeight - 390;
            setTimeout(() => {
                this.chart.resize();
            }, 20)
        }
    },
    created() {
        this.chartHeight = document.getElementById("routerView").offsetHeight - 390;
    },
    mounted() {
        // 图表初始化
        this.chart = echarts.init(document.getElementById("chart"));
        this.chart.setOption({
            title: {
                text: '日活跃用户数'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['男性用户', '女性用户'],
                right: 20
            },
            grid: {
                left: '2%',
                right: '3%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: getMonthDate()
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                    name: '男性用户',
                    type: 'line',
                    itemStyle: { color: "rgba(50,153,243,0.5)" },
                    smooth: true,
                    areaStyle: {},
                    data: this.$store.state.overview.chartData.male
                },
                {
                    name: '女性用户',
                    type: 'line',
                    itemStyle: { color: "rgb(255,134,86)" },
                    smooth: true,
                    areaStyle: {},
                    data: this.$store.state.overview.chartData.female
                }
            ]
        });
        // 如果vuex中没有数据，则通过接口获取
        if (this.chartData.male.length == 0) {
            this.chart.showLoading();
            this.$ajax.get('/api/overview/chartData').then((response) => {
                this.chart.hideLoading();
                response = response.data;
                if (response.code == "0") {
                    this.$store.commit('setChartDate', response.data)
                } else {
                    this.$notify.error({
                        title: "错误",
                        message: response.info ? response.info : "图表数据请求失败",
                        duration: 2000
                    })
                }
            }).catch((error) => {
                this.$notify.error({ title: "错误", message: '图表数据请求失败'})
            })
        }
        window.addEventListener("resize", this.chartResize);
    },
    beforeDestroy() {
        // 注销echarts图表和事件监听
        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }
        window.removeEventListener("resize", this.chartResize);
    },
    watch: {
        // 根据左侧菜单的展开与否调整图表大小
        isCollapse() {
            setTimeout(() => {
                this.chart.resize();
            }, 220)
        },
        // chartData变化时，更新echarts
        chartData() {
            this.chart.setOption({
                series: [{
                    data: this.$store.state.overview.chartData.male
                }, {
                    data: this.$store.state.overview.chartData.female
                }]
            });
        }
    }
}
</script>
<style scoped lang="scss">
.overview {

    section {
        padding: 15px;
        height: 350px;
        display: flex;
    }

    .sectionTitle {
        border-bottom: 1px solid #ccc;
        line-height: 35px;
        font-size: 16px;
        padding-right: 3px;

        i {
            float: right;
            margin-top: 10px;
            color: #999;

            &:hover {
                color: $green;
            }
        }
    }

    .todolist {
        padding: 15px;
        box-shadow: 0 1px 3px #e7e8ec;
        border-radius: 5px;
        width: 50%;

        i {
            cursor: pointer;
        }

        >ul {
            padding: 5px 0;

            li {
                padding: 0 15px;
                border-radius: 10px;

                &:hover {
                    background: #fafbfc;
                }

                div {
                    line-height: 45px;
                    border-bottom: 1px solid $grey1;

                    >* {
                        vertical-align: middle;
                        display: inline-block;
                    }

                    i.el-icon-circle-check-outline {
                        font-size: 22px;
                        color: $grey3;
                        margin-right: 10px;

                        &:hover {
                            color: $green;
                        }
                    }

                    i.el-icon-circle-check {
                        font-size: 23px;
                        margin-right: 10px;
                        color: $green;
                    }

                    i.el-icon-delete {
                        margin-left: 20px;
                        font-size: 16px;
                        color: $grey2;

                        &:hover {
                            color: #f56c6c;
                        }
                    }

                    >span.ellipsis {
                        display: inline-block;
                        width: calc(100% - 72px);

                        &.checked {
                            color: $grey2;
                            text-decoration: line-through;
                        }
                    }
                }
            }
        }
    }

    .welcome {
        padding: 15px;
        border: 1px solid #f6f6f7;
        border-radius: 5px;
        width: 22.5%;
        margin-right: 2.5%;
        overflow: hidden;
        background-color: #fbfbfd;
        background-image: url(../assets/images/welcomebg.jpg);
        background-repeat: no-repeat;
        background-size: 100% 50%;

        img.userPic {
            width: 150px;
            height: 150px;
            display: block;
            margin: 60px auto 0;
            border-radius: 50%;
            margin-bottom: 15px;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
                box-shadow: 0 0 10px #81bcc7;
            }
        }

        p {
            text-align: center;
            line-height: 32px;
        }
    }

    .numItems {
        width: 22.5%;
        margin-right: 2.5%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        li {
            border-radius: 5px;
            height: 80px;
            box-shadow: 0 1px 3px #e7e8ec;
            display: flex;
            text-align: center;
            transition: all 0.3s;

            &:nth-child(1):hover {
                box-shadow: 0 0 10px rgb(255, 134, 86);
            }

            &:nth-child(2):hover {
                box-shadow: 0 0 10px rgb(108, 174, 232);
            }

            &:nth-child(3):hover {
                box-shadow: 0 0 10px rgb(249, 172, 27);
            }

            >i {
                width: 80px;
                font-size: 40px;
                line-height: 80px;
                text-align: right;
            }

            >div {
                flex: 1;

                p {
                    color: #999;
                }

                h3 {
                    font-size: 25px;
                    line-height: 36px;
                    margin-top: 12px;
                }
            }
        }
    }

    #chart {
        height: calc(100% - 350px);
        min-height: 240px;
        margin: 25px 15px 0;
    }
}
</style>