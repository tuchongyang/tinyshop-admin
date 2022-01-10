import axios from "@/api/axios"
export default {
  tree() {
    return axios.get("/system/menu/tree")
  },
  select() {
    return axios.get("/system/menu/list")
  },
  save(opt) {
    return axios.post("/system/menu/save", opt)
  },
  remove(id) {
    return axios.delete("/system/menu/" + id)
  },
}
