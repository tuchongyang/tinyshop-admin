<template>
  <div class="base-info" :class="['base-info__' + props.type]">
    <div class="head" v-if="props.title || $slots.title">
      <div class="title" v-if="props.title">{{ props.title }}</div>
      <slot name="title"></slot>
    </div>
    <div class="body">
      <el-row v-if="data && data.length">
        <el-col v-for="(item, i) in props.data" :key="i" :span="item.span || 8">
          <div class="base-info-item">
            <span class="label">{{ item.label }}：</span>
            <span class="det" v-html="item.value"></span>
          </div>
        </el-col>
      </el-row>
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  data: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String,
    default: "",
  },
})
</script>
<style scoped lang="scss">
.base-info {
  .head {
    margin-bottom: 15px;
  }
  .title {
    font-weight: bold;
    border-left: 3px solid var(--el-text-color-regular);
    padding-left: 10px;
    line-height: 1;
  }
  .base-info-item {
    margin-bottom: 10px;
    .label {
      color: var(--el-text-color-regular);
    }
  }
  &__card {
    background: #fff;
    margin-bottom: 20px;
    > .head {
      margin-bottom: 0;
      padding: 10px 15px;
      border-bottom: 1px solid var(--el-border-color-light);
      .title {
        font-weight: normal;
        border: 0;
        padding: 0;
      }
    }

    > .body {
      padding: 15px 15px;
    }
  }
}
</style>
