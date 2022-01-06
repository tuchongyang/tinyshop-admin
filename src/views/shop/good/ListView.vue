<template>
  <div class="container">
    <PageHeader title="商品管理" desc="管理店铺下的商品，可修改商品信息、上下架等。" />
    <BaseInfo type="card">
      <CurdTable ref="tableRef" :data="data" :columns="columns" :option="option" :page-options="pageOptions" index click-row-to-view :fetch-data="fetchData" :fetch-remove="fetchRemove">
        <template #menuLeft>
          <el-button type="primary" @click="toadd">添加</el-button>
        </template>
      </CurdTable>
    </BaseInfo>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { getColumns } from "./columns"
import api from "@/api"
import PageHeader from "@/components/Layout/PageHeader"
const router = useRouter()
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
    api.shop.good
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
    api.shop.good
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
const toadd = () => {
  router.push("/shop/good/add")
}
</script>
