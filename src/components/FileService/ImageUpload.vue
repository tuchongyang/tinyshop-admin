<template>
  <div class="upload-ceil">
    <div v-if="imageUrl" class="upload-image">
      <el-image :src="imageUrl" />
      <el-icon class="delete" @click.stop="remove"><Delete /></el-icon>
    </div>
    <div class="upload-primary" v-else>
      <a-space v-if="percent">
        <el-icon><Loading /></el-icon>
        <div class="upload-primary-text">上传中...</div>
        <div v-if="percent" class="bar" :style="{ width: percent + '%' }">{{ percent + " %" }}</div>
      </a-space>
      <span v-else>
        <el-icon><Plus /></el-icon>
        <div class="upload-primary-text">上传</div>
      </span>
      <input type="file" @change="onUpload" multiple accept="image/png,image/jpeg,image/gif,image/jpg" />
    </div>
  </div>
</template>
<script>
import { Loading, Plus, Delete } from "@element-plus/icons-vue"

import { ref, computed, defineComponent } from "vue"
import api from "@/api"
export default defineComponent({
  components: { Loading, Plus, Delete },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const percent = ref(0)
    const imageUrl = computed({
      get: () => props.value,
      set: (val) => {
        emit("update:value", val)
      },
    })

    const remove = () => {
      imageUrl.value = ""
    }
    const onUpload = (event) => {
      let target = event.target
      const file = target.files && target.files[0]
      if (!file) return
      const formData = new FormData()
      formData.append("files", file)
      const onUploadProgress = (progressEvent = { loaded: 0, total: 0 }) => {
        //hwx:ts校验存在any，所以加上初始值
        percent.value = (progressEvent.loaded / progressEvent.total) * 100
      }
      api.system.file
        .upload(formData, onUploadProgress)
        .then((res) => {
          target.value = "" //同一个 input 选择同一张图片 不会触发 onchange事件
          setTimeout(() => {
            if (percent.value == 100) {
              // message.info({ type: "success", content: "上传成功"})
              percent.value = 0
            }
            imageUrl.value = res.result.url
            emit("success", res.result.url)
          })
        })
        .catch(() => {
          target.value = ""
        })
    }
    return {
      percent,
      imageUrl,
      remove,
      onUpload,
    }
  },
})
</script>
<style lang="scss" scoped>
.upload-ceil {
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;

  .upload-primary {
    width: 120px;
    height: 120px;
    line-height: 1.5715;
    position: relative;
    display: table-cell;
    vertical-align: middle;
    font-weight: bold;
    white-space: nowrap;
    text-align: center;
    cursor: pointer;
    border: 1px dashed #d9d9d9;

    .bar {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1;
      font-size: 10px;
      height: 4px;
      background-color: #52c41a;
    }
  }
  input {
    display: block;
    position: absolute;
    cursor: pointer;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    font-size: 0;
  }
  .upload-image {
    width: 120px;
    height: 120px;
    position: relative;
    :deep(.ant-image) {
      width: 120px;
      height: 120px;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    &:hover {
      .delete {
        display: block;
      }
    }
    .delete {
      position: absolute;
      top: 5px;
      right: 5px;
      color: red;
      display: none;
      &:hover {
        color: #d50000;
      }
    }
  }
}
</style>
