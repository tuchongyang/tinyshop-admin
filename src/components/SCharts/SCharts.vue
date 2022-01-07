<template>
  <div class="chart" ref="echartsRef"></div>
  <!-- <el-empty description="暂无数据" v-if="!option"></el-empty> -->
</template>
<script setup>
import { onMounted, ref, watch } from "vue"
import echarts from "./echarts"

const props = defineProps({
  option: {
    type: Object,
    default: null,
  },
})
let myCharts = null
const echartsRef = ref()
onMounted(() => {
  myCharts = echarts.init(echartsRef.value)
  myCharts && myCharts.setOption(props.option)

  window.addEventListener("resize", resizeChart)
})
watch(
  () => props.option,
  (val) => {
    if (val) {
      myCharts && myCharts.setOption(val)
    }
  }
)
const resizeChart = () => {
  myCharts && myCharts.resize()
}
</script>

<style scoped>
.chart {
  height: 100%;
  min-height: 200px;
}
</style>
