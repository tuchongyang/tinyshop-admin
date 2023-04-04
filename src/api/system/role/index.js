import axios from "@/api/axios"
export default {
  save(opt) {
    return axios.post("/system/role/save", opt)
  },
  select(params) {
    return axios.get("/system/role/list", { params })
  },
  list(params) {
    return axios.get("/system/role", { params })
  },
  remove(id) {
    return axios.delete("/system/role/" + id)
  },
  menuList(roleId) {
    return axios.get("/system/role/" + roleId + "/menu")
  },
  menuSave(id, opt) {
    return axios.post("/system/role/" + id + "/menu", opt)
  },
  authList(id) {
    return axios.get("/system/role/" + id + "/permission")
  },
  authSave(id, opt) {
    return axios.post("/system/role/" + id + "/permission", opt)
  },
}
