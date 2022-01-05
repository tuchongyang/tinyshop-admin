import axios from "@/api/axios"
export default {
  save(opt) {
    return axios.post("/merchant/save", opt)
  },
  select(params) {
    return axios.get("/merchant/list", { params })
  },
  list(params) {
    return axios.get("/merchant", { params })
  },
  remove(id) {
    return axios.delete("/merchant/" + id)
  },
}
