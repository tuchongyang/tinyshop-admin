<template>
  <el-dialog v-model="visible" width="780px" :maskClosable="false" title="选择图片">
    <div class="fil-header">
      <ImageUpload @success="onUploadSuccess" />
    </div>
    <div class="fil-main">
      <div class="content" v-loading="loading">
        <ImageList :list="list" v-model="selectList" @delete="remove" :max="props.max" />
      </div>
    </div>
    <template #footer>
      <div class="page">
        <el-pagination v-model:current-page="listQuery.pageIndex" :total="total" background layout="prev, pager, next" :page-size="12" @current-change="loadData" />
      </div>
      <span class="dialog-footer">
        <el-button @click="onClose" :disabled="loading">取消</el-button>
        <el-button type="primary" @click="onSubmit" :disabled="loading">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue"
import { ElDialog, ElPagination } from "element-plus"
import ImageUpload from "./ImageUpload.vue"
import ImageList from "./ImageList.vue"
import { deepClone } from "@/utils/common"
import api from "@/api"

const props = defineProps({
  remove: {
    type: Function,
  },
  success: {
    type: Function,
  },
  max: {
    type: Number,
    default: 1,
  },
})
// const close = ref(() => null)
const visible = ref(true)
const loading = ref(false)
const selectList = ref([])
const total = ref(0)
const list = ref([])
// const success = ref(() => null)
const listQuery = ref({
  pageIndex: 1,
  pageSize: 12,
})
const onSubmit = () => {
  if (!selectList.value.length) {
    // message.error("没有选择文件")
    return
  }
  props.success(selectList.value)
  onClose()
}

const onClose = () => {
  props.remove()
}
const loadData = (defaul) => {
  loading.value = true
  api.system.file
    .my(listQuery.value)
    .then((res) => {
      list.value = res.result.rows
      total.value = res.result.count
      if (defaul) {
        selectList.value = [deepClone(list.value[0])]
      }
    })
    .finally(() => {
      loading.value = false
    })
}
const onUploadSuccess = () => {
  listQuery.value.pageIndex = 1
  loadData(true)
}
const remove = (id) => {
  api.system.file.remove(id).then(() => {
    // message.info({
    //   type: "success",
    //   content: "删除成功",
    // })
    loadData()
  })
}
loadData()
</script>
<style lang="scss" scoped>
.fil-header {
  margin-bottom: 10px;
  :deep(.upload-ceil) {
    display: inline-block;
    .upload-primary {
      width: auto;
      height: 28px;
      line-height: 28px;
      border: 1px solid #1890ff;
      padding: 1px 25px;
      border-radius: 3px;
      background: #1890ff;
      color: #fff;
      .anticon-plus {
        display: none;
      }
      .upload-primary-text {
        display: inline-block;
        vertical-align: top;
        margin-left: 10px;
      }
    }
  }
}
.fil-main {
  .content {
    overflow-y: auto;
  }
}
.page {
  float: left;
}
</style>
