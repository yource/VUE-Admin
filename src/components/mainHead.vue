<template>
    <div class="mainHead">
        <div class="logo">
            <img src="@/assets/images/logo.png">
        </div>
            <div class="headWhite"></div>
            <div class="rightMenu">
                <el-tooltip effect="dark" content="待办事项" placement="bottom">
                    <el-badge :value="8">
                        <el-button @click="openTodo" icon="el-icon-document"></el-button>
                    </el-badge>
                </el-tooltip>
                <el-tooltip effect="dark" content="站内信" placement="bottom">
                    <el-badge :value="3">
                        <el-button @click="openMessage1" icon="el-icon-message"></el-button>
                    </el-badge>
                </el-tooltip>
                <el-tooltip effect="dark" content="系统通知" placement="bottom">
                    <el-badge :value="6">
                        <el-button @click="openMessage2" icon="el-icon-bell"></el-button>
                    </el-badge>
                </el-tooltip>
                <el-dropdown>
                    <div class="el-dropdown-link">
                        <img class="userHead" src="@/assets/images/user01.png">
                        <span style="padding: 0 2px 0 6px;">管理员01</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><div @click="openUserinfo">个人信息</div></el-dropdown-item>
                        <el-dropdown-item><div @click="loginout">退出登录</div></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
</template>
<script>
export default {
    name: 'mainHead',
    methods:{
        openTodo(){
            this.$router.push({name:"todo"})
        },
        openMessage1(){
            this.$router.push({name:"message",params:{tab:"webside"}})
        },
        openMessage2(){
            this.$router.push({name:"message",params:{tab:"system"}})
        },
        openUserinfo(){
            this.$router.push({name:"myinfo"})
        },
        loginout(){
            alert("退出登录")
        }
    }
}
</script>
<style scoped lang="scss">
.mainHead {
    height: 54px;
    background: -webkit-linear-gradient(left, #4a5786, #0d5480);
    background: -o-linear-gradient(right, #4a5786, #0d5480);
    background: -moz-linear-gradient(right, #4a5786, #0d5480);
    background: linear-gradient(to right, #4a5786, #0d5480);
    padding: 0 20px;
}

.logo {
    float: left;
    .iconfont{
        color: #fff;
        font-size: 18px;
        vertical-align: text-bottom;
        margin-right: 28px;
        border:1px solid #36986d;
        display: inline-block;
        width: 30px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        cursor: pointer;
        border-radius: 2px;
        transition: all 0.2s;
        &:hover{
            color: #62e0a8;
        }
    }
    img {
        margin-top: 15px;
    }
}

.headWhite {
    width: calc(100% - 735px);
    overflow: hidden;
    float: left;
    height: 50px;
}

.rightMenu {
    float: right;
    padding-left: 20px;
    margin-top: 2px;

    .el-badge {
        height: 34px;
        margin-top: 14px;
        width: 50px;
        margin-right: 20px;
    }

    .el-button {
        border: none;
        height: 34px;
        font-size: 28px;
        background: none;
        color: #fff;
        padding: 0 14px;
        margin-top: -4px;
    }

    .userHead {
        width: 34px;
        height: 34px;
        border-radius: 50%;
    }

    .el-dropdown {
        margin-left: 25px;
        margin-top: 3px;
    }

    .el-dropdown-link {
        color: #fff;

        >* {
            vertical-align: middle;
        }
    }
}


.tips {}
</style>