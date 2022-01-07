import * as components from "../components"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import * as Icons from "./icons"

import VueCurd from "@vue-curd/vue-curd"

import FileService from "@/components/FileService"
export default (app) => {
  app.use(ElementPlus, { locale: zhCn, size: "mini" })
  // 装载components组件
  for (const i in components) {
    const item = components[i]
    const name = item.name || i
    app.component(name, item)
  }
  // 装载Icon图标
  for (const i in Icons) {
    const item = Icons[i]
    const name = i
    app.component(name, item)
  }

  app.use(VueCurd)
  app.use(FileService)
}
