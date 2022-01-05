import axios from "@/api/axios"
export default {
  select() {
    return axios.get("/system/file/list")
  },
  list(params) {
    return axios.get("/system/file", { params })
  },
  remove(id) {
    return axios.delete("/system/file/" + id)
  },
}
