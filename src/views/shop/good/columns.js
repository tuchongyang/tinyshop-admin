import constant from "@/utils/constant"
export function getColumns() {
  return [
    { label: "主图", prop: "picUrl", form: { component: "file" } },
    { label: "名称", prop: "name", filter: { component: "input" } },
    { label: "市场价", prop: "marketPrice" },
    { label: "销售价", prop: "salePrice" },
    { label: "已售", prop: "sales" },
    {
      label: "状态",
      prop: "status",
      align: "center",
      options: constant.GoodStatus,
      filter: {
        component: "select",
      },
      form: {
        component: "radio",
        value: 1,
        hidden: (form) => !form.id,
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
  ]
}
