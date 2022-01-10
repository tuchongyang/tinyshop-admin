<template>
  <el-aside class="a-aside" :class="[sideTheme]" :style="sideStyle" :width="!isCollapse ? 'var(--aside-width-open)' : 'var(--aside-width-close)'">
    <SLogo />
    <SMenu />
  </el-aside>
</template>
<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import SMenu from "../SMenu"
import SLogo from "../SLogo"
const store = useStore()
const isCollapse = computed(() => !store.state.layout.sideOpen)
const sideTheme = computed(() => store.state.layout.sideTheme)
const sideStyle = computed(() => {
  return {
    backgroundColor: store.state.layout.sideBg,
  }
})
</script>
<style scoped lang="scss">
.a-aside {
  min-height: 100vh;
  background: $aside-bg;
  transition: width 0.3s;
  z-index: 50;
  &.light {
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.08);
  }
}
</style>
