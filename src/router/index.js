import { createRouter, createWebHistory } from "vue-router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import routes from "./routes"
import store from "@/store"

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const whiteList = ["/login", "/401", "/404", "/403", "/signup"] // 不需要重定向白名单
  // next();return;//暂时去掉登录拦截
  if (whiteList.indexOf(to.path) != -1 || to.path.indexOf("login") > -1) {
    // 在免登录白名单，直接进入
    next()
  } else {
    if (!store.state.user.user.id) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
        replace: true,
      })
    } else {
      next()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
