import api from "@/api"
import { ref } from "vue"
export function useRankHook() {
  const rankList = ref([])
  const getData = () => {
    api.statistics.dashboardadmin.shopsalerank().then((res) => {
      rankList.value = res.result
    })
  }
  getData()
  return { rankList }
}
