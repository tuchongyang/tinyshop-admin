<template>
  <div class="layout-page-header">
    <div class="left">
      <div class="title">{{ props.title }}</div>
      <div class="desc">{{ props.desc }}</div>
    </div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
})
</script>
<style scoped lang="scss">
.layout-page-header {
  margin: -$body-padding;
  padding: $body-padding;
  margin-bottom: $body-padding;
  background: #fff;
  overflow: hidden;
  .left {
    float: left;
    .title {
      font-size: $font-size + 2;
    }
    .desc {
      font-size: $font-size - 2;
      color: #999;
    }
  }
  .right {
    float: right;
  }
}
</style>
