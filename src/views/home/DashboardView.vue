<template>
  <AdminDashboard v-if="user.type == 1" />
  <MerchantDashboard v-else />
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import AdminDashboard from "./admin/AdminDashboard"
import MerchantDashboard from "./merchant/MerchantDashboard"
const store = useStore()
const user = computed(() => store.state.user.user)
</script>
<style scoped lang="scss">
.data-group {
  .num {
    font-size: 20px;
  }
  .desc {
    font-size: 12px;
  }
}
.menu-item {
  background: #fff;
  text-align: center;
  padding: 15px 0;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.06);
  }
  .el-icon {
    font-size: 24px;
  }
  .name {
    display: block;
  }
}
.visitChart {
  height: 210px;
}
.rank-list {
  .item {
    overflow: hidden;
    line-height: 30px;
    .index {
      float: left;
      width: 20px;
      height: 20px;
      line-height: 20px;
      display: inline-block;
      background: var(--el-bg-color);
      border-radius: 50%;
      text-align: center;
      margin-right: 10px;
      font-size: 12px;
      color: var(--el-text-color-regular);
      margin-top: 5px;
    }
    .name {
      float: left;
    }
    .num {
      float: right;
    }
    &:nth-child(1) {
      .index {
        background: #ffc87a;
        color: #fff;
      }
    }
    &:nth-child(2) {
      .index {
        background: #ffc87a;
        color: #fff;
      }
    }
    &:nth-child(3) {
      .index {
        background: #ffc87a;
        color: #fff;
      }
    }
  }
}
</style>
