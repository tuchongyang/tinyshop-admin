<template>
  <PageHeader title="菜单管理">
    <template #right>
      <el-button type="primary" @click="edit()" class="float-right">
        <el-icon><Plus /></el-icon>添加
      </el-button>
    </template>
  </PageHeader>
  <div class="menu-conatiner">
    <el-tree ref="treeRef" class="menu-tree" :props="props" :data="tree" highlight-current default-expand-all>
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <el-icon class="node-icon"><component :is="data.icon || node.expanded ? FolderOpened : Folder"></component></el-icon>
          <span class="node-tit">{{ data.name }}</span>
          <el-dropdown class="control" trigger="click">
            <el-button class="el-dropdown-link" @click.stop type="text">
              <el-icon><MoreFilled /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <div @click="edit(data, node)">
                    <el-icon><Edit /></el-icon> 编辑
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click="addChild(data, node)">
                    <el-icon><Plus /></el-icon>添加子菜单
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click="remove(data)">
                    <el-icon><Delete /></el-icon>删除
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
    </el-tree>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance } from "vue"
import api from "@/api"
import { MoreFilled, Plus, Edit, Delete, Folder, FolderOpened } from "@element-plus/icons-vue"
import PageHeader from "@/components/Layout/PageHeader/index"

const props = {
  label: "name",
  children: "children",
  isLeaf: "leaf",
}
const tree = ref([])

const loadNode = () => {
  api.system.menu.tree().then((res) => {
    tree.value = res.result
  })
}
const edit = (data, node) => {
  var schema = [
    { label: "菜单名称", prop: "name", type: "input" },
    { label: "图标", prop: "icon", type: "input" },
    { label: "路径", prop: "path", type: "input" },
  ]
  if (data) {
    data.parentName = node.parent.data.name || "无"
    schema.unshift({ label: "父级菜单", prop: "parentName", readonly: true, type: "value" })
  } else {
    const asyncOptions = async () => {
      const res = await api.system.menu.select()
      const options = res.result.map((a) => ({ label: a.name, value: a.id }))
      return [{ label: "无", value: "" }, ...options]
    }
    schema.unshift({ label: "父级菜单", prop: "parentId", type: "select", asyncOptions, valueKey: "id", labelKey: "name" })
  }
  instance.appContext.config.globalProperties.$formDialog.show({
    title: "添加菜单",
    fields: data,
    formSchema: {
      formItem: schema,
    },
    handleOk: (modelRef) => {
      console.log("modelRef", modelRef)
      return api.system.menu.save(modelRef).then(() => {
        instance.appContext.config.globalProperties.$message.success("保存成功")
        loadNode()
      })
    },
  })
}
const instance = getCurrentInstance()
const addChild = (data) => {
  var form = {
    parent: data.name,
    parentId: data.id,
  }
  var schema = [
    { label: "父级菜单", prop: "parent", readonly: true, type: "value" },
    { label: "父级菜单", prop: "parentId", hidden: true },
    { label: "菜单名称", prop: "name", type: "input" },
    { label: "图标", prop: "icon", type: "input" },
    { label: "路径", prop: "path", type: "input" },
  ]
  instance.appContext.config.globalProperties.$formDialog.show({
    title: "添加子菜单",
    fields: form,
    formSchema: {
      formItem: schema,
    },
    handleOk: (modelRef) => {
      return api.system.menu.save(modelRef).then(() => {
        instance.appContext.config.globalProperties.$message.success("保存成功")
        loadNode()
      })
    },
  })
}
const remove = (data) => {
  instance.appContext.config.globalProperties
    .$confirm("确认删除菜单【" + data.name + "】吗", "提示")
    .then(() => {
      api.system.menu.remove(data.id).then(() => {
        instance.appContext.config.globalProperties.$message({ type: "success", message: "删除成功", duration: 2000 })
        loadNode()
      })
    })
    .catch(() => {})
}

loadNode()
</script>
<style lang="scss" scoped>
.menu-conatiner {
  margin: 10px auto;
  width: 600px;
}
.menu-tree {
  margin: 10px 10px;

  :deep(.el-tree-node__content) {
    height: 30px;
  }

  .custom-tree-node {
    width: 100%;
    line-height: 30px;
    .node-icon {
      margin-right: 5px;
    }
    .control {
      float: right;
      .el-dropdown-link {
        padding: 0 10px;
        color: #666;
      }
    }
  }
}
</style>
