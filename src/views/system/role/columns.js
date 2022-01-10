import constant from "@/utils/constant"
export function getColumns() {
  return [
    {
      label: "名称",
      prop: "name",
      filter: {
        component: "input",
      },
      form: {
        rules: [{ required: true, trigger: "blur", message: "请输入用户姓名" }],
      },
    },
    {
      label: "状态",
      prop: "status",
      align: "center",
      options: constant.CommonStatus,
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
