<template>
  <el-popover placement="bottom" :width="300" trigger="click" popper-class="message-popover">
    <template #reference>
      <el-button type="text" class="item-bell">
        <el-badge is-dot class="item">
          <el-icon :size="14"><Bell /></el-icon>
        </el-badge>
      </el-button>
    </template>
    <el-tabs class="message-tabs" v-model="activeName">
      <el-tab-pane label="通知" name="1"><NoticeList /></el-tab-pane>
      <el-tab-pane label="关注" name="2">
        <el-empty description="数据空空的" :image-size="60"></el-empty>
      </el-tab-pane>
      <el-tab-pane label="待办" name="3"><NoticeList /></el-tab-pane>
    </el-tabs>
    <div class="view-all">查看全部</div>
  </el-popover>
</template>
<script setup>
import { ref } from "vue"
import NoticeList from "./NoticeList.vue"
const activeName = ref("1")
</script>
<style lang="scss">
.el-popover.el-popper.message-popover {
  padding: 0;
}
</style>
<style scoped lang="scss">
.item-bell {
  font-size: 16px;
  padding-top: 13px;
  vertical-align: top;
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;
  color: var(--el-text-color-regular);
  &:hover {
    background: var(--el-bg-color);
  }
  .el-icon {
    font-size: 14px;
  }
}

.message-tabs {
  :deep(.el-tabs__header) {
    margin-bottom: 0;
  }
  :deep(.el-tabs__nav) {
    float: none;
    display: flex;
  }
  :deep(.el-tabs__item) {
    flex: 1;
    text-align: center;
    margin: 0;
    height: 34px;
    line-height: 34px;
    font-size: 12px;
  }
  :deep(.el-tabs__nav-wrap::after) {
    height: 1px;
  }
  :deep(.el-tabs__active-bar) {
    height: 1px;
  }
}

.view-all {
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background: #fafafa;
  }
  &:active {
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.06) inset;
  }
}
</style>
