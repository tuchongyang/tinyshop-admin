import Storage from "@/utils/Storage"
import api from "@/api"
export default {
  namespaced: true,
  state: {
    user: Storage.get("user", {}),
    token: Storage.get("token"),
  },
  mutations: {
    setUser(state, preload) {
      state.user = preload
      Storage.set("user", preload)
    },
    clearUser(state) {
      state.user = {}
      Storage.remove("user")
    },
    setToken(state, preload) {
      state.token = preload
      Storage.set("token", preload)
    },
    logout(state) {
      state.user = {}
      Storage.remove("user")
      state.token = ""
      Storage.remove("token")
    },
  },
  actions: {
    login({ commit }, preload) {
      return api.system.user.login(preload).then((res) => {
        commit("setToken", res.result)
      })
    },
    getUserInfo({ commit }) {
      return api.system.user.info().then((res) => {
        commit("setUser", res.result)
      })
    },
  },
}
