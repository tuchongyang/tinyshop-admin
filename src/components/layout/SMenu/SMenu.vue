<template>
  <el-menu :collapse="isCollapse" :default-active="defaultActive" :router="true" v-bind="themeColor" class="s-menu">
    <template v-for="(item, i) in routesRef" :key="i">
      <SMenuItem :menu="item" />
    </template>
  </el-menu>
</template>
<script setup>
import { computed, ref } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"
import SMenuItem from "./SMenuItem.vue"
import api from "@/api"
const store = useStore()
const isCollapse = computed(() => !store.state.layout.sideOpen)
const route = useRoute()

const defaultActive = computed(() => route.path)

const themeColor = computed(() => {
  const sideBg = store.state.layout.sideBg
  let colorObj = {
    "active-text-color": "var(--el-color-primary: #409eff)",
    "background-color": sideBg,
    "text-color": "rgba(255,255,255,.7)",
  }
  if (store.state.layout.sideTheme == "light") {
    colorObj = {
      "active-text-color": "var(--el-color-primary: #409eff)",
      "background-color": sideBg,
      "text-color": "#666",
    }
  }
  return colorObj
})

const routesRef = ref([])
const getMenu = () => {
  api.system.user.menu().then((res) => {
    routesRef.value = res.result
  })
}
getMenu()
// console.log("router", routes)
</script>
<style scoped lang="scss">
.s-menu {
  border: 0;
  :deep(.el-menu-item:hover) {
    background-color: rgba(0, 0, 0, 0.1);
    color: var(--el-color-primary);
  }
  :deep(.el-menu-item.is-active) {
    background-color: rgba(255, 255, 255, 0.1);
  }
  :deep(.el-sub-menu .el-menu) {
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>
