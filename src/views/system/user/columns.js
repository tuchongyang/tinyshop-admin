import constant from "@/utils/constant"
import api from "@/api"
const roleAsyncOptions = async () => {
  const res = await api.system.role.select()
  const options = res.result.map((a) => ({ label: a.name, value: a.id }))
  return [...options]
}
export function getColumns() {
  return [
    {
      label: "姓名",
      prop: "name",
      filter: {
        component: "input",
      },
      form: {
        rules: [{ required: true, trigger: "blur", message: "请输入用户姓名" }],
      },
    },
    {
      label: "登录账号",
      children: [
        {
          label: "用户名",
          prop: "username",
          filter: {
            component: "input",
          },
          form: {
            rules: [{ required: true, trigger: "blur", message: "请输入用户名" }],
          },
        },
        {
          label: "手机号",
          prop: "phone",
          filter: {
            component: "input",
          },
          form: {
            component: "input",
            rules: [{ len: 11, message: "请输入正确的手机号码", trigger: "blur" }],
          },
        },
        {
          label: "邮箱",
          prop: "email",
          form: {
            component: "input",
            rules: [{ type: "email", message: "请填写正确的邮箱", trigger: "blur" }],
          },
        },
      ],
    },
    {
      label: "密码",
      prop: "password",
      form: {
        component: "input-password",
        hidden: (form) => form.id,
        rules: [{ required: true, message: "请填写密码", trigger: "blur" }],
      },
    },

    {
      label: "角色",
      prop: "roleId",
      align: "center",
      form: {
        component: "select",
        rules: [{ required: true, trigger: "change", message: "请选择用户角色" }],
        value: 1,
        asyncOptions: roleAsyncOptions,
      },
    },
    {
      label: "性别",
      prop: "sex",
      align: "center",
      options: [
        { label: "男", value: 1 },
        { label: "女", value: 2 },
      ],
      form: {
        component: "radio",
        value: 1,
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
