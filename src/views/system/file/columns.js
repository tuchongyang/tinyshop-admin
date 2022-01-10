export function getColumns() {
  return [
    {
      label: "名称",
      prop: "name",
    },
    {
      label: "类型",
      prop: "type",
    },
    {
      label: "文件类型",
      prop: "format",
    },
    {
      label: "图片",
      prop: "image",
    },
    {
      label: "创建者",
      prop: "creator",
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
