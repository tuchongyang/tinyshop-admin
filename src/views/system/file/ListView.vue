<template>
  <div class="container">
    <PageHeader title="文件管理" desc="" />
    <BaseInfo type="card">
      <CurdTable ref="tableRef" :data="data" :columns="columns" :option="option" :page-options="pageOptions" index :fetch-data="fetchData" :fetch-remove="fetchRemove">
        <template #image="scope">
          <el-image :src="scope.row.url"></el-image>
        </template>
      </CurdTable>
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
  hideOprationDetail: true,
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
    api.system.file.list(params).then((res) => {
      data.value = res.result.rows // 数据赋值
      pageOptions.value.total = res.result.count // 设置总页数
      resolve()
    })
  })
}
const fetchRemove = (row) => {
  return new Promise((resolve, reject) => {
    api.system.file
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
