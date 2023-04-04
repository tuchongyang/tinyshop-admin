import axios from "axios"
import { ElMessage } from "element-plus"
import Storage from "@/utils/Storage"
import router from "@/router"

const service = axios.create()
/*axios 配置*/
service.defaults.headers.post["Content-Type"] = "application/json"

// 允许携带cookie
service.defaults.withCredentials = true

/* 阻止重复提交 */
const pending = [] //声明一个数组用户存储每个ajax请求的取消函数和ajax标识
const cancelToken = axios.CancelToken
const removePending = (config) => {
  for (const p in pending) {
    if (pending[p].url == config.url) {
      //当前请求在数组中存在时执行函数体
      pending[p].f("cancel") //执行取消操作
      pending.splice(+p, 1)
    }
  }
}

/*http request拦截器*/
service.interceptors.request.use(
  function (config) {
    if (["post", "put", "delete"].indexOf(config.method + "") > -1) {
      removePending(config)
      config.cancelToken = new cancelToken((c) => {
        const o = { url: config.url || "", f: c }
        pending.push(o)
      })
    }
    const baseUrl = /^(\/api)/.test(config.url) ? "" : "/api"

    config.url = baseUrl + config.url
    let token = Storage.get("token")
    if (token) {
      //将token放到请求头发送给服务器,将tokenkey放在请求头中
      config.headers.authorization = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// http response 拦截器
service.interceptors.response.use(
  function (response) {
    if (response.data.status === 401) {
      if (router.currentRoute.value.path.indexOf("/login") <= -1) {
        ElMessage.error(response.data.message || "请求失败，请稍后重试")
        router.replace({
          path: "/login",
        })
      }
      return Promise.reject(response.data)
    }
    if (response.data.status != 200) {
      ElMessage.error(response.data.message || "请求失败，请稍后重试")
      return Promise.reject(response.data)
    }

    return response.data
  },
  async function (error) {
    if (error.response) {
      ElMessage.error(error.response.data?.message || "服务器连接失败，请稍后重试")
    } else {
      /* 取消 */
      if (error.message && error.message === "cancel") {
        return
      }
      ElMessage.error("服务器连接失败，请稍后重试")
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error)
  }
)

export default service
