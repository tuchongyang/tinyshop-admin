<template>
  <div class="custom-form">
    <PageHeader :title="id ? '编辑商品' : '添加商品'" />
    <BaseInfo type="card">
      <el-steps :active="step" align-center finish-status="success" style="margin-bottom: 40px">
        <el-step title="基本信息"></el-step>
        <el-step title="商品详情"></el-step>
      </el-steps>
      <div v-show="step == 1">
        <curd-form v-model="form1" ref="dynamicForm" :fields="fields" :form-schema="formSchema">
          <template #specs="scope">
            <FormSpecs v-model="scope.formModel[scope.formItem.prop]" v-bind="scope" />
          </template>
          <template #images="scope">
            <FormImages v-model="scope.formModel[scope.formItem.prop]" v-bind="scope" />
          </template>
          <template v-slot:operate-button>
            <div>
              <el-button type="primary" @click="next">下一步</el-button>
            </div>
          </template>
        </curd-form>
      </div>
      <template v-if="step == 2">
        <div class="center-form">
          <curd-form ref="dynamicForm1" :form-schema="formSchema1" :label-width="formSchema1.labelWidth || '110px'">
            <template v-slot:operate-button>
              <div>
                <el-button type="primary" @click="submit" v-if="!loading">提交</el-button>
                <el-button type="primary" disabled v-else>
                  <el-icon class="is-loading"><Loading /></el-icon>
                  提交中
                </el-button>
                <el-button type="default" @click="prev" :disabled="loading">上一步</el-button>
              </div>
            </template>
          </curd-form>
        </div>
      </template>
    </BaseInfo>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue"
import { useRouter, useRoute } from "vue-router"
import PageHeader from "@/components/Layout/PageHeader"
import { Loading } from "@element-plus/icons-vue"
import FormSpecs from "./components/FormSpecs"
import FormImages from "./components/FormImages"
import constantMap from "@/utils/constant"
import api from "@/api"
const asyncOptions = async () => {
  const res = await api.store.category.tree()
  return res.result
}
const validateImages = (rule, value, callback) => {
  if (!value || !value.length) {
    return callback(new Error("商品图片不能为空"))
  }
  callback()
}
const validateSpecs = (rule, value, callback) => {
  if (!value || !value.length) {
    return callback(new Error("商品规格不能为空"))
  }
  callback()
}
const formSchema = ref({
  formItem: [
    { type: "cascader", label: "商品分类", prop: "categoryId", span: 24, asyncOptions, props: { props: { value: "id", label: "name", emitPath: false } } },
    { type: "input", label: "商品名称", prop: "name", span: 24 },
    { type: "input", label: "商品描述", prop: "description", span: 24, props: { type: "textarea" } },
    { type: "images", label: "商品图片", prop: "images", span: 24, value: [] },
    { type: "specs", label: "商品规格", prop: "specs", span: 24, value: [] },
    { type: "input", label: "商品标签", prop: "tags", span: 24 },
    { type: "radio", label: "状态", prop: "status", span: 24, options: constantMap.GoodStatus, value: 1 },
  ],
  rules: {
    categoryId: [{ required: true, message: "请选择商品分类", trigger: "blur" }],
    name: [{ required: true, message: "商品名称不能为空", trigger: "blur" }],
    images: [
      { required: true, message: "商品图片不能为空", trigger: "blur" },
      { validator: validateImages, message: "商品图片不能为空", trigger: "change" },
    ],
    specs: [
      { required: true, message: "商品规格不能为空", trigger: "blur" },
      { validator: validateSpecs, message: "商品规格不能为空", trigger: "change" },
    ],
  },
  labelWidth: 110,
})
const fields = {}
const formSchema1 = {
  formItem: [{ type: "input", label: "详情", prop: "content", span: 24, props: { type: "textarea" } }],
}
const dynamicForm = ref()
const dynamicForm1 = ref()
const instance = getCurrentInstance()
const loading = ref(false)
const form1 = ref({})
const router = useRouter()
const submit = () => {
  dynamicForm1.value.validate((valid) => {
    if (valid) {
      loading.value = true
      console.log("form1", form1)
      const defaultImage = form1.value.images.find((a) => a.isDefault)
      if (defaultImage) {
        form1.value.picId = defaultImage.id
      }
      api.shop.good.save(form1.value).then(() => {
        instance.appContext.config.globalProperties.$message({
          type: "success",
          message: "提交成功",
        })
        loading.value = false
        router.back()
      })
    }
  })
}
const step = ref(1)
const prev = () => {
  step.value--
}
const next = () => {
  dynamicForm.value.validate((valid) => {
    if (valid) {
      step.value++
    }
  })
}

const route = useRoute()

// 编辑
const id = route.params.id
const detail = ref({})
const getDetail = () => {
  api.shop.good.detail(id).then((res) => {
    detail.value = res.result
    // 设置主图
    res.result.images.forEach((a) => {
      if (a.id === res.result.picId) {
        a.isDefault = true
      }
    })
    // 处理价格，避免控制台黄色警告
    res.result.specs.forEach((a) => {
      a.marketPrice = +a.marketPrice
      a.salePrice = +a.salePrice
    })
    for (const i in res.result) {
      form1.value[i] = res.result[i]
    }
    console.log("form1.value", form1.value)
  })
}
id && getDetail()
</script>

<style></style>
