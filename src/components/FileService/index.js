// create-api.ts
import { createVNode, render, nextTick } from "vue"
import MainView from "./MainView.vue"
let _app

/**
 * 创建表单模态框
 */
const FileService = () => {}

FileService.show = (options) => {
  // 组件实例
  let formModal
  const container = document.createElement("div")
  // 移除组件
  const remove = () => {
    formModal = null
    render(null, container)
    container.remove()
  }
  formModal = createVNode(MainView, { ...options, remove })
  // 使当前模态框继承App实例上下文
  nextTick(() => {
    _app && (formModal.appContext = _app._instance?.appContext)
    render(formModal, container)
    document.body.appendChild(container)
  })
  return formModal
}
// 暴露一个插件 API
const install = (app) => {
  _app = app
  app.config.globalProperties["$fileService"] = FileService
}
FileService.install = install
export { FileService }
export default FileService
