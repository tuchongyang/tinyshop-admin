import axios from "@/api/axios"
export default {
  save: (params) => axios.post("/shop/order/save", params),
  select: (params) => axios.get("/shop/order/list", { params }),
  list: (params) => axios.get("/shop/order", { params }),
  tree: (params) => axios.get("/shop/order/tree", { params }),
  remove: (id) => axios.delete("/shop/order/" + id),
  update: (params) => axios.post("/shop/order/update", params),
  detail: (id) => axios.get("/shop/order/" + id),
  send: (id) => axios.post("/shop/order/send/" + id),
}
