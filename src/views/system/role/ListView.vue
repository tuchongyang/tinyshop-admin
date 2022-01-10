<template>
  <div class="container">
    <PageHeader title="角色管理" desc="系统角色管理,不同角色可分配不同的菜单与权限" />
    <BaseInfo type="card">
      <CurdTable ref="tableRef" :data="data" :columns="columns" :page-options="pageOptions" index click-row-to-view :fetch-data="fetchData" :fetch-create="fetchCreate" :fetch-edit="fetchEdit" :fetch-remove="fetchRemove">
        <template #operation="scope">
          <el-button type="text" icon="el-icon-edit" @click.stop="authMenu(scope.row)">授权菜单</el-button>
          <el-button type="text" icon="el-icon-edit" @click.stop="authPermission(scope.row)">授权权限</el-button>
        </template>
      </CurdTable>
    </BaseInfo>
  </div>
  <RoleMenu v-if="menuVisible" :visible="menuVisible" :data="currentData"></RoleMenu>
  <RolePermission v-if="authVisible" :visible="authVisible" :data="currentData"></RolePermission>
</template>
<script setup>
import { getCurrentInstance, ref } from "vue"
import { getColumns } from "./columns"
import api from "@/api"
import PageHeader from "@/components/Layout/PageHeader"
import RoleMenu from "./RoleMenu"
import RolePermission from "./RolePermission"

const instance = getCurrentInstance()
const tableRef = ref()
const pageOptions = ref({
  total: 0,
  pageSize: 10,
  status: "",
})
const data = ref([])
const columns = getColumns()

const fetchData = ({ pageIndex, pageSize, sortColumn, sortType, search }) => {
  return new Promise((resolve) => {
    const params = {
      pageIndex,
      pageSize,
      ...search,
    }

    if (sortColumn) {
      params.sortColumn = sortColumn
      params.sortType = sortType
    }
    api.system.role.list(params).then((res) => {
      data.value = res.result.rows // 数据赋值
      pageOptions.value.total = res.result.count // 设置总页数
      resolve()
    })
  })
}
const fetchCreate = (params) => {
  return new Promise((resolve, reject) => {
    api.system.role
      .save(params)
      .then(() => {
        instance.appContext.config.globalProperties.$message.success("保存成功")
        tableRef.value.fetchData()
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const fetchEdit = (editedParams, fullParams) => {
  editedParams.id = fullParams.id
  return new Promise((resolve, reject) => {
    api.system.role
      .save(editedParams)
      .then(() => {
        instance.appContext.config.globalProperties.$message.success("保存成功")
        tableRef.value.fetchData()
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const fetchRemove = (row) => {
  return new Promise((resolve, reject) => {
    api.system.role
      .remove(row.id)
      .then(() => {
        tableRef.value.fetchData()
        resolve(row)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const currentData = ref()
const menuVisible = ref(false)
const authVisible = ref(false)
const authMenu = (data) => {
  currentData.value = data
  menuVisible.value = true
}
const authPermission = (data) => {
  currentData.value = data
  authVisible.value = true
}
</script>
