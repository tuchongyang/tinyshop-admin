import axios from "@/api/axios"
export default {
  list(params) {
    return axios.get("/system/reqlog", { params })
  },
  remove(id) {
    return axios.delete("/system/reqlog/" + id)
  },
}
