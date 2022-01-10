import api from "@/api"
import { ref } from "vue"
export function useRankHook() {
  const rankList = ref([])
  const getData = () => {
    api.statistics.dashboard.goodsalerank().then((res) => {
      rankList.value = res.result.slice(0, 7)
    })
  }
  getData()
  return { rankList }
}
