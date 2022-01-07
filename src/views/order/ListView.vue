<template>
  <div class="container">
    <PageHeader title="订单管理" desc="管理店铺下的订单，可进行发货、确认订单等操作" />
    <BaseInfo type="card">
      <CurdTable ref="tableRef" :data="data" :columns="columns" :option="option" :page-options="pageOptions" index :fetch-data="fetchData" :fetch-remove="fetchRemove">
        <template #operation="scope">
          <el-button type="text" :icon="Document" @click.stop="todetail(scope.row)">详情</el-button>
        </template>
      </CurdTable>
    </BaseInfo>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { Document } from "@element-plus/icons-vue"
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
  hideMenuAdd: true,
  hideOperationEdit: true,
  hideOperationDetail: true,
}

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
const router = useRouter()
const todetail = (row) => {
  router.push("/order/detail/" + row.id)
}
</script>
