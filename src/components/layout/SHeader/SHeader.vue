<template>
  <el-header class="a-header" :class="[headerTheme]" :style="headerStyle">
    <div class="header-left">
      <SAsideToggle />
      <Breadcrumb />
    </div>
    <div class="header-right"><SHeaderRight /></div>
  </el-header>
</template>
<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import SAsideToggle from "../SAsideToggle"
import Breadcrumb from "../Breadcrumb"
import SHeaderRight from "../SHeaderRight"
const store = useStore()
const headerTheme = computed(() => store.state.layout.headerTheme)
const headerStyle = computed(() => {
  return {
    backgroundColor: store.state.layout.headerBg,
  }
})
</script>
<style scoped lang="scss">
.a-header {
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: $header-height;
  line-height: $header-height;
  display: flex;
  justify-content: space-between;
  &.dark {
    background: $aside-bg;
    color: rgba(255, 255, 255, 0.5);
    :deep(.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link) {
      color: #fff;
      font-weight: normal;
      opacity: 0.4;
    }
    :deep(.app-breadcrumb.el-breadcrumb .no-redirect) {
      color: #fff;
      opacity: 0.3;
    }
  }
}
</style>
