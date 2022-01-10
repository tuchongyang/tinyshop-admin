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
  // 管理员修改用户资料
  modify(opt) {
    const { id, ...params } = opt
    return axios.post("/system/user/modify/" + id, params)
  },
  // 个人修改资料,无需传用户id
  update(opt) {
    return axios.post("/system/user/update", opt)
  },
  remove(id) {
    return axios.delete("/system/user/" + id)
  },
  menu() {
    return axios.get("/system/user/menu")
  },
}
