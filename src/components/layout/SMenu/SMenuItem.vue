<template>
  <el-sub-menu :index="props.menu.path" v-if="props.menu.children && props.menu.children.length">
    <template #title>
      <el-icon v-if="props.menu.meta && props.menu.meta.icon"><component :is="props.menu.meta.icon" /></el-icon>
      <span>{{ (props.menu.meta && props.menu.meta.title) || props.menu.name }}</span>
    </template>
    <template v-for="(sub, i) in props.menu.children" :key="i">
      <SMenuItem :menu="sub" />
    </template>
  </el-sub-menu>
  <el-menu-item :index="props.menu.path" v-else>
    <el-icon v-if="props.menu.meta && props.menu.meta.icon"><component :is="props.menu.meta.icon" /></el-icon>
    <span>{{ (props.menu.meta && props.menu.meta.title) || props.menu.name }}</span>
  </el-menu-item>
</template>
<script setup>
import { defineProps } from "vue"
const props = defineProps({
  menu: {
    type: Object,
    default: () => {
      return {}
    },
  },
})
</script>
