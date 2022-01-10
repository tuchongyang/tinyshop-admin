<template>
  <el-drawer title="角色菜单授权" v-model="dVisible" :wrapperClosable="true" :before-close="handleClose" append-to-body>
    <div class="drawer-body" v-loading="loading">
      <el-tree ref="tree" class="menu-tree" :props="props" :data="tree" highlight-current default-expand-all>
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <el-checkbox v-model="data.checked" :indeterminate="data.checked && data.children && !!data.children.length && !node.childNodes.every((a) => a.data.checked)" :label="data.id">{{ null }}</el-checkbox>
            <i class="node-icon" :class="[data.icon || 'el-icon-folder']"></i>
            <span class="node-tit">{{ data.name }}</span>
          </div>
        </template>
      </el-tree>
    </div>
    <div class="drawer-footer">
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-drawer>
</template>
<script>
import api from "@/api"
import { deepClone } from "@/utils/common"
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
        children: "children",
        isLeaf: "leaf",
      },
      sourceTree: [],
      tree: [],
      defaultChecked: [],
    }
  },
  created() {
    this.getAllMenu()
  },
  methods: {
    init() {
      this.defaultChecked = []
      this.tree = deepClone(this.sourceTree)
      this.getList()
    },
    handleClose() {
      this.$emit("update:visible", false)
    },
    getAllMenu() {
      api.system.menu.tree().then((res) => {
        this.sourceTree = res.result
        this.init()
      })
    },
    getList() {
      this.loading = true
      api.system.role
        .menuList(this.data.id)
        .then((res) => {
          this.defaultChecked = res.result.map((a) => a.id)
          this.findChecked()
        })
        .finally(() => {
          this.loading = false
        })
    },
    findChecked() {
      var find = (menus) => {
        for (let i = 0; i < menus.length; i++) {
          if (this.defaultChecked.indexOf(menus[i].id) > -1) {
            this.$set(menus[i], "checked", true)
          }
          if (menus[i].children && menus[i].children.length) {
            find(menus[i].children)
          }
        }
      }
      find(this.tree)
    },
    submit() {
      api.system.role.menuSave(this.data.id, this.tree).then(() => {
        this.$message({ type: "success", message: "保存成功", duration: 2000 })
        this.handleClose()
      })
    },
  },
}
</script>
<style scoped lang="scss">
.custom-tree-node {
  .el-checkbox {
    margin-right: 0;
  }
  .node-icon {
    margin-right: 10px;
  }
}
</style>
