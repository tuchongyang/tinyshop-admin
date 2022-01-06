<template>
  <div class="container">
    <PageHeader title="订单管理" desc="管理店铺下的订单，可进行发货、确认订单等操作" />
    <BaseInfo type="card">
      <CurdTable ref="tableRef" :data="data" :columns="columns" :page-options="pageOptions" index click-row-to-view :fetch-data="fetchData" :fetch-create="fetchCreate" :fetch-edit="fetchEdit" :fetch-remove="fetchRemove"> </CurdTable>
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
    api.shop.order
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
    api.shop.order
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
    api.shop.order
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
    api.shop.order
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
</script>
