<template>
  <PageHeader title="订单详情" desc="" />
  <BaseInfo title="订单流程" type="card">
    <el-steps :active="stepActive" align-center finish-status="success">
      <el-step v-for="(item, i) in statusArray" :key="i" :title="item.label"></el-step>
    </el-steps>
  </BaseInfo>
  <BaseInfo title="基本信息" :data="data1" type="card"></BaseInfo>
  <BaseInfo title="收货地址" :data="data2" type="card"></BaseInfo>
  <BaseInfo title="订单商品" type="card">
    <CurdTable :data="detail.goodList" :columns="columns" :option="option" />
    <div class="price-line">
      总金额：<span class="orange">￥{{ detail.totalAmount }}</span>
    </div>
  </BaseInfo>
</template>
<script setup>
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import PageHeader from "@/components/Layout/PageHeader"
import constantMap from "@/utils/constant"
import api from "@/api"
const data1 = ref([])
const data2 = ref([])
const columns = [
  { label: "主图", prop: "goodPic", form: { component: "file" } },
  { label: "名称", prop: "goodName" },
  { label: "销售价", prop: "salePrice" },
  { label: "数量", prop: "qty" },
]
const option = {
  hideFilter: true,
  hideMenu: true,
  hideOperation: true,
  hideMenuAdd: true,
  hidePage: true,
}
const route = useRoute()
const stepActive = ref(0)
const detail = ref({
  status: "ordered",
  goodList: [],
})
const statusArray = computed(() => {
  const a = constantMap.OrderStatus.slice(0, 4)
  const statusIndex = constantMap.OrderStatus.findIndex((a) => a.value == detail.value.status)
  if (statusIndex > 4) {
    a.push(constantMap.OrderStatus[statusIndex])
  } else {
    a.push(constantMap.OrderStatus[4])
  }
  return a
})
const getDetail = () => {
  api.shop.order.detail(route.params.id).then((res) => {
    detail.value = res.result
    const statusIndex = constantMap.OrderStatus.findIndex((a) => a.value == detail.value.status)
    stepActive.value = statusIndex
    data1.value = [
      { label: "订单号", value: detail.value.orderNo, span: 8 },
      { label: "下单用户", value: detail.value.userName, span: 8 },
      { label: "下单时间", value: detail.value.createdAt, span: 8 },
      { label: "备注", value: detail.value.remark, span: 8 },
    ]
    data2.value = [
      { label: "收货地址", value: detail.value.address, span: 24 },
      { label: "收货人", value: detail.value.linkMan, span: 8 },
      { label: "收货人电话", value: detail.value.linkPhone, span: 8 },
    ]
  })
}
getDetail()
</script>
<style scoped lang="scss">
.price-line {
  text-align: right;
  padding: 15px 0;
  .orange {
    color: #ff9600;
  }
}
</style>
