<template>
  <div class="layout-page-footer" :class="{ fixed: props.fixed }" :style="{ left: !isCollapse ? 'var(--aside-width-open)' : 'var(--aside-width-close)' }">
    <div class="left"><slot name="left" /></div>
    <div class="right"><slot name="right" /></div>
  </div>
</template>
<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
const props = defineProps({
  fixed: {
    type: Boolean,
    default: true,
  },
})
const store = useStore()
const isCollapse = computed(() => !store.state.layout.sideOpen)
</script>
<style scoped lang="scss">
.layout-page-footer {
  margin: -$body-padding;
  padding: 10px $body-padding;
  margin-bottom: 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  &.fixed {
    position: fixed;
    margin: 0;
    bottom: 0;
    right: 0;
    left: var(--aside-width-open);
    box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.1);
    z-index: 40;
  }
}
</style>
