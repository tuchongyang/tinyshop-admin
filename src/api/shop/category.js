import axios from "@/api/axios"
export default {
  save: (params) => axios.post("/shop/category/save", params),
  select: (params) => axios.get("/shop/category/list", { params }),
  list: (params) => axios.get("/shop/category", { params }),
  tree: (params) => axios.get("/shop/category/tree", { params }),
  remove: (id) => axios.delete("/shop/category/" + id),
  update: (params) => axios.post("/shop/category/update", params),
}
