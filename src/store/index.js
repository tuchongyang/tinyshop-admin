import { createStore } from "vuex"
import layout from "./modules/layout"
import tagsView from "./modules/tagsView"
import user from "./modules/user"
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    layout,
    tagsView,
    user,
  },
})
