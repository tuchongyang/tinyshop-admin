<template>
  <el-drawer title="角色权限" v-model="dVisible" :wrapperClosable="true" :before-close="handleClose" append-to-body @open="init">
    <div class="drawer-body" v-loading="loading">
      <div class="permission-list">
        <div class="item" v-for="item in list" :key="item.id">
          <div class="title">
            <el-checkbox v-model="item.checked" :indeterminate="item.checked && item.actions && !!item.actions.length && !item.actions.every((a) => a.checked)">{{ null }}</el-checkbox>
            <span class="node-tit">{{ item.name }}</span>
          </div>
          <div class="det">
            <el-checkbox v-model="action.checked" v-for="action in item.actions" :key="action.action">{{ action.name }}</el-checkbox>
          </div>
        </div>
      </div>
    </div>
    <div class="drawer-footer">
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-drawer>
</template>
<script>
import api from "@/api"
export default {
  props: ["visible", "data"],
  computed: {
    dVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit("update:visible", val)
      },
    },
  },
  data() {
    return {
      loading: false,
      props: {
        label: "name",
        children: "actions",
        isLeaf: "leaf",
      },
      list: [],
    }
  },
  created() {},
  methods: {
    init() {
      this.defaultChecked = []
      this.getList()
    },
    handleClose() {
      this.$emit("update:visible", false)
    },
    getList() {
      this.loading = true
      api.system.role
        .authList(this.data.id)
        .then((res) => {
          this.list = res.result
          this.findChecked()
        })
        .finally(() => {
          this.loading = false
        })
    },

    submit() {
      api.system.role.authSave(this.data.id, this.list).then(() => {
        this.$message({ type: "success", message: "保存成功", duration: 2000 })
        this.handleClose()
      })
    },
  },
}
</script>
<style scoped lang="scss">
.permission-list {
  margin: 0 15px;
  .item {
    margin-bottom: 10px;
    .det {
      margin-left: 25px;
    }
  }
}
</style>
