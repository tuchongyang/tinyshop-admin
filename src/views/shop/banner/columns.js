import constant from "@/utils/constant"
import Storage from "@/utils/Storage"
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
    { label: "排序", prop: "sort", filter: { component: "input" }, form: { type: "input", span: 24 } },
    { label: "链接", prop: "url", filter: { component: "input" }, form: { type: "input", span: 24 } },
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
