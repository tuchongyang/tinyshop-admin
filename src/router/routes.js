export default [
  {
    path: "/redirect",
    component: () => import("@/components/Layout/BasicLayout"),
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/RedirectView"),
      },
    ],
  },
  {
    path: "/login",
    meta: { title: "登录", icon: "House" },
    component: () => import("@/views/public/LoginView"),
  },
  {
    path: "/",
    name: "Dashboard",
    meta: { title: "主页", icon: "House" },
    component: () => import("@/components/Layout/BasicLayout"),
    children: [
      {
        path: "404",
        component: () => import("@/views/error-page/404.vue"),
        hidden: true,
      },
      {
        path: "401",
        component: () => import("@/views/error-page/401.vue"),
        hidden: true,
      },
      {
        path: "",
        name: "home",
        meta: { title: "主页", icon: "House" },
        component: () => import("@/views/home/DashboardView"),
      },
      {
        path: "/setting",
        name: "setting",
        meta: { title: "设置", icon: "Setting" },
        component: () => import("@/components/Layout/EmptyLayout"),
        children: [
          {
            path: "theme",
            name: "theme",
            meta: { title: "主题" },
            component: () => import("@/views/setting/ThemeSetting"),
          },
        ],
      },
      {
        path: "/system",
        name: "system",
        meta: { title: "系统管理", icon: "Setting" },
        component: () => import("@/components/Layout/EmptyLayout"),
        children: [
          {
            path: "menu",
            name: "menu",
            meta: { title: "菜单管理" },
            component: () => import("@/views/system/menu/ListView"),
          },
          {
            path: "user",
            name: "user",
            meta: { title: "用户管理" },
            component: () => import("@/views/system/user/ListView"),
          },
          {
            path: "role",
            name: "role",
            meta: { title: "角色管理" },
            component: () => import("@/views/system/role/ListView"),
          },
          {
            path: "file",
            name: "file",
            meta: { title: "文件管理" },
            component: () => import("@/views/system/file/ListView"),
          },
          {
            path: "reqLog",
            name: "reqLog",
            meta: { title: "操作日志" },
            component: () => import("@/views/system/reqLog/ListView"),
          },
        ],
      },
      {
        path: "/merchant",
        name: "merchant",
        meta: { title: "商家管理", icon: "Setting" },
        component: () => import("@/components/Layout/EmptyLayout"),
        children: [
          {
            path: "merchant",
            name: "merchantList",
            meta: { title: "商家管理" },
            component: () => import("@/views/merchant/ListView"),
          },
        ],
      },
      // 404 page must be placed at the end !!!
      // using pathMatch install of "*" in vue-router 4.0
      { path: "/:pathMatch(.*)", redirect: "/404", hidden: true },
    ],
  },
]
