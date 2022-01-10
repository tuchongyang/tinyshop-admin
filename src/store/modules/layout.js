export default {
  namespaced: true,
  state: {
    sideOpen: true, // 左侧菜单
    sideTheme: "dark",
    sideBg: "#191919",
    headerTheme: "light",
    headerBg: "#fff",
  },
  mutations: {
    toggleSide(state) {
      state.sideOpen = !state.sideOpen
    },
    setSideTheme(state, preload) {
      state.sideTheme = preload
    },
    setHeaderTheme(state, preload) {
      state.headerTheme = preload
    },
    setSideBg(state, preload) {
      state.sideBg = preload
    },
    setHeaderBg(state, preload) {
      state.headerBg = preload
    },
  },
}
