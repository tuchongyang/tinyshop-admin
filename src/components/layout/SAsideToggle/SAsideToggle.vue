<template>
  <div class="aside-toggle" @click="toggle">
    <el-icon><expand v-if="!sideOpen" /><fold v-else /></el-icon>
  </div>
</template>
<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
const store = useStore()
const sideOpen = computed(() => store.state.layout.sideOpen)
const toggle = () => {
  store.commit("layout/toggleSide")
}
// console.log("sideOpen", sideOpen)
</script>
<style scoped lang="scss">
.aside-toggle {
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  height: $header-height;
  margin-right: 15px;
  padding-top: 16px;
  .el-icon {
    vertical-align: top;
    font-size: 18px;
  }
}
</style>
