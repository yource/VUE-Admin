<template>
    <div class="overview">
        <section>
        	<div class="welcome">
            	<img src="@/assets/images/user01.png" class="userPic">
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
                    <i title="更多" class="el-icon-d-arrow-right"></i>
                </div>
                <ul>
                    <li>
                        <i class="el-icon-circle-check-outline"></i>
                        <!-- <i class="el-icon-circle-checked"></i> -->
                        <span class="ellipsis">待办事项1待办事项1待办事项1待办事项1</span>
                        <i class="el-icon-delete"></i>
                    </li>
                    <li>
                        <!-- <i class="el-icon-circle-check-outline check"></i> -->
                        <i class="el-icon-circle-check"></i>
                        <span class="ellipsis checked">待办事项2待办事项1待办事项1待办事项1</span>
                        <i class="el-icon-delete"></i>
                    </li>
                    <li>
                        <i class="el-icon-circle-check-outline"></i>
                        <!-- <i class="el-icon-circle-checked"></i> -->
                        <span class="ellipsis">待办事项3待办事项1待办事项1待办事项1</span>
                        <i class="el-icon-delete"></i>
                    </li>
                    <li>
                        <i class="el-icon-circle-check-outline"></i>
                        <!-- <i class="el-icon-circle-checked"></i> -->
                        <span class="ellipsis">待办事项4待办事项1待办事项1待办事项1</span>
                        <i class="el-icon-delete"></i>
                    </li>
                    <li>
                        <i class="el-icon-circle-check-outline"></i>
                        <!-- <i class="el-icon-circle-checked"></i> -->
                        <span class="ellipsis">待办事项5待办事项1待办事项1待办事项1</span>
                        <i class="el-icon-delete"></i>
                    </li>
                </ul>
            </div>
        </section>
        <div id="chart" :style="{height:chartHeight+'px'}"></div>
    </div>
</template>
<script>
var mychart, mychartOption;

function initChart(id) {
    mychart = echarts.init(document.getElementById(id));
    mychartOption = {
        title: {
        text: '日活跃用户数'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['男性用户','女性用户'],
        right:20
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
    series: [
        {
            name:'男性用户',
            type:'line',
            itemStyle:{color:"#8999ec"},
            smooth: true,
            areaStyle: {},
            data:[220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, 310,330,290]
        },
        {
            name:'女性用户',
            type:'line',
            itemStyle:{color:"#ff8656"},
            smooth: true,
            areaStyle: {},
            data:[120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,120, 132]
        }
    ]
    };
    mychart.setOption(mychartOption);
}

function getMonthDate(){
	var month = [];
	var now = new Date();
	for(let i=1;i<16;i++){
		now.setDate(now.getDate()-1);
		month.push(now.getMonth()+1+"月"+now.getDate()+"日")
	}
	return month.reverse();
}

export default {
    name: 'overview',
    created() {
        this.chartHeight = document.getElementById("routerView").offsetHeight - 390;
    },
    mounted() {
        initChart("chart")
    },
    updated() {
        console.log("updated")
    },
    data:()=>({
    	chartHeight:"300"
    }),
    computed: {
        isCollapse() {
            return !this.$store.state.expandMenu;
        }
    },
    watch:{
    	"isCollapse":()=>{
    		setTimeout(()=>{
    			mychart.resize();
    		},220)
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
        // background: #fbfbfd;
        box-shadow: 0 1px 3px #e7e8ec;
        border-radius: 5px;
        width: 50%;

        i {
            cursor: pointer;
        }

        >ul {
            padding: 5px 15px;

            li {
                line-height: 45px;
                border-bottom: 1px solid $grey1;

                >* {
                    vertical-align: middle;
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

                >span {
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
    .welcome{
    	padding: 15px;
        border:1px solid #f6f6f7;
        border-radius: 5px;
        width: 22.5%;
        margin-right: 2.5%;
        overflow: hidden;
        background-color:#fbfbfd;
        background-image: url(../assets/images/welcomebg.jpg);
        background-repeat: no-repeat;
        background-size: 100% 50%;
        img.userPic{
        	width: 150px;
        	height: 150px;
        	display: block;
        	margin:60px auto 0;
        	border-radius:50%;
        	margin-bottom: 15px;
        }
        p{
        	text-align: center;
        	line-height: 32px;
        }
    }
    .numItems{
    	width: 22.5%;
    	margin-right: 2.5%;
    	display: flex;
    	flex-direction: column;
    	justify-content: space-between;
    	li{
    		border-radius:5px;
    		height: 80px;
    		box-shadow: 0 1px 3px #e7e8ec;
    		display: flex;
    		text-align: center;
    		>i{
    			width: 80px;
    			font-size: 40px;
    			line-height: 80px;
    			text-align: right;
    		}
    		>div{
    			flex:1;
    			p{
    				color: #999;
    			}
    			h3{
    				font-size: 25px;
    				line-height: 36px;
    				margin-top: 12px;
    			}
    		}
    	}
    }

    #chart{
    	height: calc(100% - 350px);
    	min-height:280px;
    	margin:25px 15px 0;
    }
}
</style>