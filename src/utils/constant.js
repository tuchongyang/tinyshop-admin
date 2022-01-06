export const constantMap = {
  CommonStatus: [
    { value: 1, label: "启用", className: "color-green", icon: "circle-check" },
    { value: 2, label: "禁用", className: "color-red", icon: "remove" },
  ],
  GoodStatus: [
    { value: 1, label: "上架", className: "color-green", icon: "circle-check" },
    { value: 2, label: "下架", className: "color-gray", icon: "remove" },
  ],
  // ordered: '待付款', inpayment: '付款中', paid: '已付款，待发货', receiving: '已发货，待收货', completed: '已完成', canceled: '已取消',closed:已关闭
  OrderStatus: [
    { value: "ordered", label: "待付款", className: "color-blue", icon: "circle-check" },
    { value: "inpayment", label: "付款中", className: "color-blue", icon: "remove" },
    { value: "paid", label: "待发货", className: "color-orange", icon: "remove" },
    { value: "receiving", label: "待收货", className: "color-orange", icon: "remove" },
    { value: "completed", label: "已完成", className: "color-green", icon: "remove" },
    { value: "canceled", label: "已取消", className: "color-gray", icon: "remove" },
    { value: "closed", label: "已关闭", className: "color-gray", icon: "remove" },
  ],
}
export default constantMap
