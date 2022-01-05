import axios from "@/api/axios"
export default {
  login(opt) {
    return axios.post("/system/user/login", opt)
  },
  info() {
    return axios.get("/system/user/info")
  },
  list(params) {
    return axios.get("/system/user", { params })
  },
  save(opt) {
    return axios.post("/system/user/save", opt)
  },
  modify(opt) {
    const { id, ...params } = opt
    return axios.post("/system/user/modify/" + id, params)
  },
  remove(id) {
    return axios.delete("/system/user/" + id)
  },
  menu() {
    return axios.get("/system/user/menu")
  },
}
