import constant from "@/utils/constant"
export function getColumns() {
  return [
    { label: "订单号", prop: "orderNo", filter: { component: "input" } },
    { label: "商品总数量", prop: "goodsTotalQty" },
    { label: "下单金额", prop: "totalAmount" },
    { label: "下单用户", prop: "userName" },
    {
      label: "状态",
      prop: "status",
      align: "center",
      options: constant.OrderStatus,
      filter: {
        component: "select",
      },
    },
    {
      label: "创建时间",
      prop: "createdAt",
      width: 170,
      form: {
        hidden: true,
      },
      sortable: true,
    },
    {
      label: "ID",
      prop: "id",
      width: 120,
      hidden: true,
      form: {
        component: "input",
        props: {
          disabled: true,
        },
        hidden: (form) => !form.id,
      },
    },
  ]
}
