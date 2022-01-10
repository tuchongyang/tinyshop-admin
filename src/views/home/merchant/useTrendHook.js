import api from "@/api"
import { ref } from "vue"
import dayjs from "dayjs"
export function useTrendHook() {
  const trendData = ref([])
  const optionAmount = ref()
  const optionNum = ref()
  const params = {
    startTime: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
    endTime: dayjs().format("YYYY-MM-DD"),
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
    api.statistics.dashboard.ordertrend(params).then((res) => {
      trendData.value = res.result
      optionAmount.value = getOption(trendData.value.times, [{ type: "bar", data: trendData.value.totalAmount }])
      optionNum.value = getOption(trendData.value.times, [{ type: "line", data: trendData.value.num }])
    })
  }

  getData()
  return { trendData, optionAmount, optionNum }
}
