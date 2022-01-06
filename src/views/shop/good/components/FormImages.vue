<template>
  <el-upload ref="uploadRef" :action="'/api/system/file/upload'" :file-list="model" :headers="headers" list-type="picture-card" :auto-upload="true" :on-success="onSuccess">
    <template #default>
      <el-icon><component :is="'Plus'"></component></el-icon>
    </template>
    <template #file="{ file }">
      <span v-if="file.isDefault" class="image-default-tag">主图</span>
      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
      <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-preview" title="设为主图" @click="handleSetDefault(file)">
          <el-icon><setting /></el-icon>
        </span>
        <span class="el-upload-list__item-delete" @click="handleRemove(file)">
          <el-icon><delete /></el-icon>
        </span>
      </span>
    </template>
  </el-upload>
</template>
<script>
import { defineComponent, computed, ref } from "vue"
import Storage from "@/utils/Storage"
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

    const headers = {
      authorization: Storage.get("token"),
    }
    const uploadRef = ref()

    const handleRemove = (file) => {
      var fileList = uploadRef.value.uploadFiles
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].uid == file.uid) {
          fileList.splice(i, 1)
          break
        }
      }
      model.value = fileList
    }
    const handleSetDefault = (file) => {
      uploadRef.value.uploadFiles.forEach((f) => {
        f.isDefault = false
      })
      file.isDefault = true
    }
    const onSuccess = (response, file, fileList) => {
      file.id = response.result.id
      if (fileList.length == 1) {
        file.isDefault = true
      }
      model.value = fileList
    }

    return {
      model,
      handleRemove,
      handleSetDefault,
      onSuccess,
      headers,
      uploadRef,
    }
  },
})
</script>
<style lang="scss" scoped>
.image-default-tag {
  position: absolute;
  padding: 0 30px;
  background: #ff9600;
  color: #fff;
  font-size: 12px;
  top: 0;
  left: -30px;
  transform: rotate(-45deg);
}
</style>
