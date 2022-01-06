import constant from "@/utils/constant"
import Storage from "@/utils/Storage"
import api from "@/api"
const asyncOptions = async () => {
  const res = await api.shop.category.select()
  const options = res.result.map((a) => ({ label: a.name, value: a.id }))
  return [{ value: "", label: "无" }, ...options]
}
export function getColumns() {
  return [
    {
      label: "主图",
      prop: "imageUrl",
      form: {
        component: "file",
        span: 24,
        prop: "imageId",
        action: "/api/system/file/upload",
        headers: {
          authorization: Storage.get("token"),
        },
        getUrl: (form) => {
          return form.imageUrl
        },
        success: (res, file, model) => {
          model.value = res.result.id
        },
      },
    },
    { label: "父级", prop: "parentId", form: { component: "select", asyncOptions }, hidden: true },
    { label: "名称", prop: "name", filter: { component: "input" } },
    { label: "描述", prop: "description", filter: { component: "input" }, form: { props: { type: "textarea" } } },
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
  ]
}
