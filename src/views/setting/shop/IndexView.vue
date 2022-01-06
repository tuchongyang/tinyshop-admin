<template>
  <PageHeader title="店铺资料" desc="" />
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
const fields = computed(() => store.state.user.user.merchant || {})
const instance = getCurrentInstance()
const formSchema = {
  labelWidth: 110,
  formItem: [
    {
      prop: "logoId",
      label: "logo",
      type: "file",
      span: 13,
      action: "/api/system/file/upload",
      headers: {
        authorization: Storage.get("token"),
      },
      url: fields.value.logoUrl,
      success: (res) => {
        model.value.logoId = res.result.id
      },
    },
    { prop: "name", label: "名称", type: "input", span: 13 },
    { prop: "address", label: "地址", type: "input", span: 13 },
    { prop: "phone", label: "电话", type: "input", span: 13 },
    { prop: "appId", label: "小程序AppId", type: "input", span: 13 },
    { prop: "appSecret", label: "小程序AppSecret", type: "input", span: 13 },
  ],
}
const save = () => {
  api.merchant.update(model.value).then(() => {
    instance.appContext.config.globalProperties.$message.success("保存成功")
    store.dispatch("user/getUserInfo")
  })
}
</script>
