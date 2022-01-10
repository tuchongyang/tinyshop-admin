<template>
  <el-container class="a-container">
    <s-aside />
    <el-container class="right-container" direction="vertical">
      <SHeader />
      <TagsView />
      <el-main class="center-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import SAside from "./SAside"
import TagsView from "./TagsView"
import SHeader from "./SHeader"
</script>
<style scoped lang="scss">
.center-main {
  background: $body-background;
  padding: $body-padding;
}
.right-container {
  height: 100vh;
  position: relative;
}
</style>
