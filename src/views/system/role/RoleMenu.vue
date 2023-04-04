<template>
  <el-drawer title="角色菜单授权" v-model="visible" append-to-body>
    <div class="drawer-body" v-loading="loading">
      <el-tree class="menu-tree" :props="treeProps" :data="tree" highlight-current default-expand-all>
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <el-checkbox v-model="data.checked" :indeterminate="data.checked && data.children && !!data.children.length && !node.childNodes.every((a) => a.data.checked)" :label="data.id">{{ null }}</el-checkbox>
            <el-icon class="node-icon"><component :is="data.icon || Folder"></component></el-icon>
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
<script setup>
import { ref, getCurrentInstance } from "vue"
import api from "@/api"
import { deepClone } from "@/utils/common"
import { Folder } from "@element-plus/icons-vue"
const visible = ref(false)
let currentData = {}
const open = (data) => {
  currentData = data
  visible.value = true
  init()
  getList(data)
}
defineExpose({ open })
const treeProps = ref({
  label: "name",
  children: "children",
  isLeaf: "leaf",
})
const loading = ref(false)
const defaultChecked = ref([])
const sourceTree = ref([])
const tree = ref([])

const findChecked = () => {
  var find = (menus) => {
    for (let i = 0; i < menus.length; i++) {
      if (defaultChecked.value.indexOf(menus[i].id) > -1) {
        menus[i].checked = true
      }
      if (menus[i].children && menus[i].children.length) {
        find(menus[i].children)
      }
    }
  }
  find(tree.value)
}
const getList = (data) => {
  loading.value = true
  api.system.role
    .menuList(data.id)
    .then((res) => {
      defaultChecked.value = res.result.map((a) => a.id)
      findChecked()
    })
    .finally(() => {
      loading.value = false
    })
}
const init = () => {
  defaultChecked.value = []
  tree.value = deepClone(sourceTree.value)
}

const getAllMenu = () => {
  api.system.menu.tree().then((res) => {
    sourceTree.value = res.result
    init()
  })
}

getAllMenu()
const instance = getCurrentInstance()
const submit = () => {
  api.system.role.menuSave(currentData.id, tree.value).then(() => {
    instance.appContext.config.globalProperties.$message({ type: "success", message: "保存成功", duration: 2000 })
    visible.value = false
  })
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
