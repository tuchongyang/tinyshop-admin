import axios from "@/api/axios"
export default {
  // 总量统计
  totalnum: () => axios.get("/statistics/dashboardadmin/totalnum"),
  // 店铺销量排行前10
  shopsalerank: () => axios.get("/statistics/dashboardadmin/shopsalerank"),
  // 订单趋势
  ordertrend: (params) => axios.get("/statistics/dashboardadmin/ordertrend", { params }),
}
