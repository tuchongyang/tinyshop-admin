<template>
  <el-drawer title="角色权限" v-model="visible" :wrapperClosable="true" append-to-body>
    <div class="drawer-body" v-loading="loading">
      <div class="permission-list">
        <div class="item" v-for="item in list" :key="item.id">
          <div class="title">
            <el-checkbox v-model="item.checked" :indeterminate="item.checked && item.actions && !!item.actions.length && !item.actions.every((a) => a.checked)">{{ null }}</el-checkbox>
            <span class="node-tit">{{ item.name }}</span>
          </div>
          <div class="det">
            <el-checkbox v-model="action.checked" v-for="action in item.actions" :key="action.action">{{ action.name }}</el-checkbox>
          </div>
        </div>
      </div>
    </div>
    <div class="drawer-footer">
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-drawer>
</template>
<script setup>
import { ref, getCurrentInstance } from "vue"
import api from "@/api"

const loading = ref(false)
const visible = ref(false)
const list = ref([])
let currentData = {}

const open = (data) => {
  currentData = data
  visible.value = true
  getList(data)
}
defineExpose({ open })

const getList = (data) => {
  loading.value = true
  api.system.role
    .authList(data.id)
    .then((res) => {
      list.value = res.result
    })
    .finally(() => {
      loading.value = false
    })
}
const instance = getCurrentInstance()
const submit = () => {
  api.system.role.authSave(currentData.id, list.value).then(() => {
    instance.appContext.config.globalProperties.$message({ type: "success", message: "保存成功", duration: 2000 })
    visible.value = false
  })
}
</script>
<style scoped lang="scss">
.drawer-body {
  position: absolute;
  height: calc(100% - 150px);
  overflow: auto;
}
.drawer-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 15px;
}
.permission-list {
  margin: 0 15px;
  .item {
    margin-bottom: 10px;
    .det {
      margin-left: 25px;
    }
  }
}
</style>
