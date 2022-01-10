export function getColumns() {
  return [
    { prop: "userName", label: "用户" },
    { prop: "method", label: "类型" },
    { prop: "action", label: "请求地址", "show-overflow-tooltip": true, form: { span: 24 } },
    { prop: "params", label: "请求参数", "show-overflow-tooltip": true, form: { span: 24 } },
    { prop: "ip", label: "ip" },
    { prop: "status", label: "状态" },
    { prop: "consumeTime", label: "响应时间" },
    { prop: "createdAt", label: "创建时间" },
  ]
}
