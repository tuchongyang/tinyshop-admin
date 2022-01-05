<template>
  <PageHeader title="皮肤" desc="设置侧边栏、顶部以及全局主色调" />
  <el-card shadow="never">
    <schema-form ref="dynamicForm" :fields="fields" :form-schema="formSchema" style="margin-right: 40px"> </schema-form>
  </el-card>
</template>
<script setup>
import { computed } from "vue"
import PageHeader from "@/components/Layout/PageHeader"
import { useStore } from "vuex"
const store = useStore()
const sideTheme = computed(() => store.state.layout.sideTheme)
const headerTheme = computed(() => store.state.layout.headerTheme)
const sideBg = computed(() => store.state.layout.sideBg)
const headerBg = computed(() => store.state.layout.headerBg)
const formSchema = {
  formItem: [
    {
      prop: "sidebg",
      label: "侧边栏风格",
      type: "radio",
      options: [
        { label: "深色", value: "dark" },
        { label: "浅色", value: "light" },
      ],
      value: sideTheme,
      eventObject: {
        change: (val) => {
          store.commit("layout/setSideTheme", val)
          store.commit("layout/setSideBg", val == "light" ? "#fff" : "#191919")
        },
      },
    },
    {
      prop: "sidebgcolor",
      label: "侧边栏背景",
      type: "color-picker",
      value: sideBg,
      eventObject: {
        change: (val) => {
          store.commit("layout/setSideBg", val)
        },
      },
    },
    {
      prop: "headerbg",
      label: "头部栏风格",
      type: "radio",
      options: [
        { label: "深色", value: "dark" },
        { label: "浅色", value: "light" },
      ],
      value: headerTheme,
      eventObject: {
        change: (val) => {
          store.commit("layout/setHeaderTheme", val)
          store.commit("layout/setHeaderBg", val == "light" ? "#fff" : "#191919")
        },
      },
    },
    {
      prop: "headerbgcolor",
      label: "头部栏背景",
      type: "color-picker",
      value: headerBg,
      eventObject: {
        change: (val) => {
          store.commit("layout/setHeaderBg", val)
        },
      },
    },
    {
      prop: "primarycolor",
      label: "全局主色",
      type: "color-picker",
      value: "",
      eventObject: {
        change: (val) => {
          const style = document.createElement("style")
          style.innerHTML = ":root{--el-color-primary: " + val + "}"
          document.head.appendChild(style)
        },
      },
    },
  ],
}
</script>
