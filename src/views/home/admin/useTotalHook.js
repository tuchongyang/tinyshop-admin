import api from "@/api"
import { ref } from "vue"
export function useTotalHook() {
  const total = ref({
    goodnum: 0,
    amountnum: 0,
    ordernum: 0,
    orderingnum: 0,
  })
  const getTotal = () => {
    api.statistics.dashboardadmin.totalnum().then((res) => {
      total.value = res.result
    })
  }
  getTotal()
  return { total }
}
