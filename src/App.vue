<template>
    <div id="app">
        <el-container>
            <el-header height="54px">
                <main-head />
            </el-header>
            <el-container>
                <el-aside :width="expandMenu?'190px':'50px'">
                    <main-menu />
                </el-aside>
                <el-main>
                    <main-container/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import mainHead from '@/components/mainHead.vue'
import mainMenu from '@/components/mainMenu.vue'
import mainContainer from '@/components/mainContainer.vue'
export default {
    components: {mainHead, mainMenu, mainContainer},
    computed:{
        expandMenu(){
            return this.$store.state.expandMenu;
        }
    }
}
</script>