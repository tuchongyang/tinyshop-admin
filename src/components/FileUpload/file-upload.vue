<template>
  <div class="file-list el-upload-list--picture-card">
    <div class="el-upload-list__item" v-for="(item, index) in uploadFiles" :key="index">
      <slot name="file" :file="item"></slot>
    </div>
    <div class="file-upload" @click="upload">
      <img :src="model" v-if="model" />
      <div v-else class="upload-content">
        <el-icon class="icon"><Plus /></el-icon>
        <!-- <div class="upload-text">上传</div> -->
      </div>
      <el-icon class="remove-btn"><Delete v-if="model" @click.stop="remove" /></el-icon>
    </div>
  </div>

  <div class="upload-tip" v-if="props.tip">{{ props.tip }}</div>
</template>
<script setup>
import { computed, ref, watch } from "vue"
import { Plus, Delete } from "@element-plus/icons-vue"
import FileService from "@/components/FileService"
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  max: {
    type: Number,
    default: 1,
  },
  tip: {
    type: String,
    default: "",
  },
  fileList: {
    type: Array,
    default() {
      return []
    },
  },
})
const emit = defineEmits(["update:modelValue", "success"])
const model = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit("update:modelValue", val)
  },
})
const uploadFiles = ref(props.fileList || [])
watch(
  () => props.fileList,
  (val) => {
    uploadFiles.value = val
  }
)
const remove = () => {
  model.value = ""
}

const upload = () => {
  FileService.show({
    max: props.max,
    success: (src) => {
      if (props.max > 1) {
        uploadFiles.value = uploadFiles.value.concat(src)
      } else {
        uploadFiles.value = src
      }
      model.value = src[0].url
      emit("success", src, uploadFiles.value)
    },
  })
}
defineExpose({ uploadFiles })
</script>
<style scoped lang="scss">
.file-upload {
  width: 148px;
  height: 148px;
  line-height: 1.5715;
  position: relative;
  font-weight: bold;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  border: 1px dashed #c0ccda;
  color: #999;
  border-radius: 6px;
  display: inline-block;
  vertical-align: top;
  .upload-text {
    display: block;
  }
  img {
    max-height: 100%;
    max-width: 100%;
  }
  &.big-file {
    width: 100%;
    height: 0;
    padding-bottom: 30.72%;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .upload-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .icon {
      font-size: 30px;
      color: #ccc;
    }
  }

  .remove-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    color: red;
    display: none;
    &:hover {
      color: #d60000;
    }
  }
  &:hover {
    .remove-btn {
      display: block;
    }
  }
}

.upload-tip {
  font-size: 12px;
  margin-top: 5px;
  color: #999;
}
</style>
