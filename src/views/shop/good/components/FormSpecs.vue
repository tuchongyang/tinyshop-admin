<template>
  <el-button type="default" @click="add">添加</el-button>
  <curd-table :columns="columns" :option="option" :data="model" :fetch-remove="fetchRemove">
    <template #name="scope">
      <el-input v-model="scope.row.name"></el-input>
    </template>
    <template #marketPrice="scope">
      <el-input-number v-model="scope.row.marketPrice" controls-position="right"></el-input-number>
    </template>
    <template #salePrice="scope">
      <el-input-number v-model="scope.row.salePrice" controls-position="right"></el-input-number>
    </template>
    <template #stock="scope">
      <el-input-number v-model="scope.row.stock" controls-position="right"></el-input-number>
    </template>
  </curd-table>
</template>
<script>
import { defineComponent, computed, ref } from "vue"

export default defineComponent({
  name: "SchemaFormInput",
  components: {},
  props: {
    formItem: {
      // 表单项
      type: Object,
      default: () => ({}),
    },
    formModel: {
      // 表单项
      type: Object,
      default: () => ({}),
    },
    modelValue: {
      type: Array,
      default: () => [],
    }, // 表单项值
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val),
    })
    if (!model.value) {
      model.value = []
    }
    const option = {
      hideMenu: true,
      hideBtnAdd: true,
      pageHide: true,
      hideOprationEdit: true,
      hideOprationDetail: true,
    }
    const columns = ref([
      { prop: "name", label: "规格名称" },
      { prop: "marketPrice", label: "市场价" },
      { prop: "salePrice", label: "销售价" },
      { prop: "stock", label: "库存" },
    ])

    const add = () => {
      model.value.push({ name: "", salePrice: "", marketPrice: "", stock: 999 })
    }
    const fetchRemove = (row, index) => {
      return new Promise((resolve) => {
        model.value.splice(index, 1)
        resolve(row)
      })
    }

    return {
      model,
      columns,
      option,
      add,
      fetchRemove,
    }
  },
})
</script>
