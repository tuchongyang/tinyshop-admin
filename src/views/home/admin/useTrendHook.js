import api from "@/api"
import { ref } from "vue"
export function useTrendHook() {
  const trendData = ref([])
  const optionAmount = ref()
  const optionNum = ref()
  const params = {
    startTime: "2022-01-01",
    endTime: "2022-01-11",
  }
  const getOption = (data, series) => {
    const option1 = {
      xAxis: {
        type: "category",
        data,
      },
      yAxis: {
        type: "value",
      },
      tooltip: {
        trigger: "axis",
      },
      grid: {
        top: 20,
        bottom: 20,
        left: 40,
        right: 40,
      },
      series,
    }
    return option1
  }
  const getData = () => {
    api.statistics.dashboardadmin.ordertrend(params).then((res) => {
      trendData.value = res.result
      optionAmount.value = getOption(trendData.value.times, [{ type: "bar", data: trendData.value.totalAmount }])
      optionNum.value = getOption(trendData.value.times, [{ type: "line", data: trendData.value.num }])
    })
  }

  getData()
  return { trendData, optionAmount, optionNum }
}
