<template>
  <div class="container">
    <PageHeader title="操作日志" desc="" />
    <BaseInfo type="card">
      <CurdTable ref="tableRef" :data="data" :columns="columns" :option="option" :page-options="pageOptions" index click-row-to-view :fetch-data="fetchData" :fetch-remove="fetchRemove"> </CurdTable>
    </BaseInfo>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { getColumns } from "./columns"
import api from "@/api"
import PageHeader from "@/components/Layout/PageHeader"

const tableRef = ref()
const pageOptions = ref({
  total: 0,
  pageSize: 10,
  status: "",
})
const data = ref([])
const columns = getColumns()
const option = {
  hideBtnAdd: true,
  hideOprationEdit: true,
  hideOprationDelete: true,
  operationWidth: 90,
}

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
    api.system.reqLog.list(params).then((res) => {
      data.value = res.result.rows // 数据赋值
      pageOptions.value.total = res.result.count // 设置总页数
      resolve()
    })
  })
}
const fetchRemove = (row) => {
  return new Promise((resolve, reject) => {
    api.system.reqLog
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
