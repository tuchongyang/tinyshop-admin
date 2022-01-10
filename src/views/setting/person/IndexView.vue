<template>
  <PageHeader title="个人资料" desc="" />
  <BaseInfo type="card">
    <curd-form ref="dynamicForm" v-model="model" :fields="fields" :form-schema="formSchema" style="margin-right: 40px">
      <template #operate-button>
        <el-button type="primary" @click="save">保存</el-button>
      </template>
    </curd-form>
  </BaseInfo>
</template>
<script setup>
import { computed, ref, getCurrentInstance } from "vue"
import PageHeader from "@/components/Layout/PageHeader"
import { useStore } from "vuex"
import api from "@/api"
import Storage from "@/utils/Storage"
const store = useStore()
const model = ref({})
const fields = computed(() => store.state.user.user)
const instance = getCurrentInstance()
const formSchema = {
  labelWidth: 110,
  formItem: [
    {
      prop: "avatarId",
      label: "头像",
      type: "file",
      span: 13,
      action: "/api/system/file/upload",
      headers: {
        authorization: Storage.get("token"),
      },
      url: fields.value.avatarUrl,
      success: (res) => {
        model.value.avatarId = res.result.id
      },
    },
    { prop: "username", label: "用户名", type: "value", span: 13 },
    { prop: "name", label: "昵称", type: "input", span: 13 },
    { prop: "email", label: "邮箱", type: "input", span: 13 },
    { prop: "phone", label: "电话", type: "input", span: 13 },
    {
      prop: "sex",
      label: "性别",
      type: "radio",
      span: 12,
      options: [
        { label: "男", value: 1 },
        { label: "女", value: 2 },
      ],
    },
  ],
}
const save = () => {
  api.system.user.update(model.value).then(() => {
    instance.appContext.config.globalProperties.$message.success("保存成功")
    store.dispatch("user/getUserInfo")
  })
}
</script>
