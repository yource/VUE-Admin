// 标记菜单是否展开

export default {
    state: {
        expandMenu: true
    },
    mutations: {
        changeExpandMenu(state) {
            state.expandMenu = !state.expandMenu;
        }
    }
}