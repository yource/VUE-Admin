<template>
    <transition name="asidedialog-fade">
        <div class="asideDialogWrap" v-show="show" @click.self="show=false">
            <div class="asideDialogMask" v-if="mask" @click.self="show=false"></div>
            <div class="asideDialog" :style="{width: width+'px','box-shadow': mask?'none':'rgb(126, 128, 134) 0px 0px 25px' }" >
                <div class="asideDialogHeader">
                    <div class="asideDialogTitle">
                        <span>{{title}}</span>
                        <span class="close">
                            <i class="el-icon el-icon-close" @click="show=false"></i>
                        </span>
                    </div>
                </div>
                <el-scrollbar class="asideDialogBody">
                    <div class="dialogContent">
                        <slot></slot>
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'asideDialog',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        mask: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: "详情"
        },
        width: {
            type: Number,
            default: 420
        }
    },
    data() {
        return {
            show: this.visible
        }
    },
    computed: {

    },
    methods: {

    },
    mounted() {

    },
    watch: {
        visible(newValue) {
            this.show = newValue;
        },
        show(newValue) {
            this.$emit("update:visible", newValue);
        }
    }
}
</script>
<style scoped lang="scss">
.asideDialogWrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;

    .asideDialogMask {
        background: rgba(0, 0, 0, 0.4);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .asideDialog {
        background: #fff;
        position: absolute;
        overflow: hidden;
        right: 0;
        top: 0;
        bottom: 0;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;

        .asideDialogHeader {
            font-size: 15px;
            line-height: 45px;
            padding-left: 15px;
            padding-right: 15px;
            border-bottom: 1px solid #dedede;
            border-top-left-radius: 4px;

            .close {
                float: right;
                font-size: 20px;
                cursor: pointer;
                color: #999;

                &:hover {
                    color: #ff690e;
                }
            }
        }

        .asideDialogBody {
            height: calc(100% - 45px);

            .dialogContent {
                padding: 15px;
            }
        }

        .asideDialogFooter {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: right;
            height: 60px;
            padding-top: 14px;
            border-top: 1px solid #dedede;
            box-shadow: 0 0 15px #fff;

            .el-button {
                padding: 8px 12px;
                margin: 0 20px 0 0;
            }
        }
    }
}

.asidedialog-fade-enter-active,
.asidedialog-fade-leave-active {
    transition: opacity .25s;
}

.asidedialog-fade-enter,
.asidedialog-fade-leave-to {
    opacity: 0;
}

.asidedialog-fade-enter-active .asideDialog {
    -webkit-animation: asidedialog-fade-in .25s;
    animation: asidedialog-fade-in .25s
}

.asidedialog-fade-leave-active .asideDialog {
    -webkit-animation: asidedialog-fade-out .25s;
    animation: asidedialog-fade-out .25s
}

@-webkit-keyframes asidedialog-fade-in {
    0% {
        -webkit-transform: translate3d(100px, 0, 0);
        transform: translate3d(100px, 0, 0);
    }

    100% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

@keyframes asidedialog-fade-in {
    0% {
        -webkit-transform: translate3d(100px, 0, 0);
        transform: translate3d(100px, 0, 0);
    }

    100% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

@-webkit-keyframes asidedialog-fade-out {
    0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    100% {
        -webkit-transform: translate3d(100px, 0, 0);
        transform: translate3d(100px, 0, 0);
    }
}

@keyframes asidedialog-fade-out {
    0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    100% {
        -webkit-transform: translate3d(100px, 0, 0);
        transform: translate3d(100px, 0, 0);
    }
}
</style>