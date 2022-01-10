import axios from "@/api/axios"
export default {
  // 总量统计
  totalnum: () => axios.get("/statistics/dashboard/totalnum"),
  // 商品销量排行前10
  goodsalerank: () => axios.get("/statistics/dashboard/goodsalerank"),
  // 订单趋势
  ordertrend: (params) => axios.get("/statistics/dashboard/ordertrend", { params }),
}
