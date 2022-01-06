import axios from "@/api/axios"
export default {
  tree: () => axios.get("/store/category/tree"),
}
