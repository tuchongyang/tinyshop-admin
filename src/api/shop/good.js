import axios from "@/api/axios"
export default {
  save: (params) => axios.post("/shop/good/save", params),
  list: (params) => axios.get("/shop/good", { params }),
  detail: (id) => axios.get("/shop/good/" + id),
  remove: (id) => axios.delete("/shop/good/" + id),
  update: (params) => axios.post("/shop/good/update", params),
}
