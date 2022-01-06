import axios from "@/api/axios"
export default {
  save: (params) => axios.post("/shop/banner/save", params),
  select: (params) => axios.get("/shop/banner/list", { params }),
  list: (params) => axios.get("/shop/banner", { params }),
  tree: (params) => axios.get("/shop/banner/tree", { params }),
  remove: (id) => axios.delete("/shop/banner/" + id),
  update: (params) => axios.post("/shop/banner/update", params),
}
