<template>
  <div class="container">
    <PageHeader title="商品分类" desc="管理商品的类别。" />
    <BaseInfo type="card">
      <CurdTable ref="tableRef" :data="data" :columns="columns" :page-options="pageOptions" index click-row-to-view :fetch-data="fetchData" :fetch-create="fetchCreate" :fetch-edit="fetchEdit" :fetch-remove="fetchRemove" @selectionChange="selectionChange">
        <!-- <template #roleId="scope">
          <el-tag>{{ scope.row.role.name }}</el-tag>
        </template> -->
      </CurdTable>
    </BaseInfo>
  </div>
</template>
<script setup>
import { getCurrentInstance, ref } from "vue"
import { getColumns } from "./columns"
import api from "@/api"
import PageHeader from "@/components/Layout/PageHeader"

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
  return new Promise((resolve, reject) => {
    const params = {
      pageIndex,
      pageSize,
      ...search,
    }

    if (sortColumn) {
      params.sortColumn = sortColumn
      params.sortType = sortType
    }
    api.shop.category
      .list(params)
      .then((res) => {
        data.value = res.result.rows // 数据赋值
        pageOptions.value.total = res.result.count // 设置总页数
        resolve()
      })
      .catch(() => {
        reject()
      })
  })
}
const fetchCreate = (params) => {
  return new Promise((resolve, reject) => {
    api.shop.category
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
    api.shop.category
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
    api.shop.category
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
const selectionChange = (rows) => {
  console.log("row", rows)
}
</script>
