import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 标记左侧菜单是否展开
        expandMenu: true
    },
    mutations: {
        changeExpandMenu(state) {
            state.expandMenu = !state.expandMenu;
        }
    },
    actions: {

    }
})