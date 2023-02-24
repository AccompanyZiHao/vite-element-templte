<template>
  <el-upload
    action="/foreignUnion/api/uploadFile"
    :headers="{
      token: state.token,
    }"
    drag
    ref="uploadRef"
    list-type="picture-card"
    v-model:file-list="fileList"
    :auto-upload="true"
    :limit="limit"
    :before-upload="beforeUpload"
    :on-exceed="onExceed"
    :on-remove="onRemove"
    :on-error="onError"
    :on-success="onSuccess"
  >
    <el-icon><Plus /></el-icon>
    <template #tip>
      <div class="el-upload__tip">
        {{ accept.replace(/,/g, '/') }}
      </div>
    </template>
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" class="preViewImg" />
  </el-dialog>
</template>

<script setup lang="ts" name="base-upload">
import { ref, watchEffect } from 'vue';
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue';

import {
  ElMessage,
  genFileId,
  UploadFile,
  UploadInstance,
  UploadRawFile,
} from 'element-plus';
import type { UploadProps, UploadUserFile } from 'element-plus';
import { useLoginStore } from '@/store/login';

export type UploadListItem = UploadUserFile & {
  src: string;
};

const { state } = useLoginStore();

const { accept, size, limit } = withDefaults(
  defineProps<{
    accept?: string;
    size?: number;
    limit?: number;
  }>(),
  {
    accept: 'jpg,png',
    limit: 1,
  }
);
const emit = defineEmits<{
  (event: 'change', data: UploadListItem[]): void;
}>();

const fileList = ref<UploadListItem[]>([]);
watchEffect(() => {
  emit('change', fileList.value);
});
const uploadRef = ref<UploadInstance>();
const dialogImageUrl = ref('');
const dialogVisible = ref(false);

// 上传之前校验
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (!accept.split(',').some((type) => rawFile.type.indexOf(type) > -1)) {
    ElMessage.warning(`file must be ${accept} format!`);
    return false;
  } else if (size && rawFile.size / 1024 / 1024 > size) {
    ElMessage.warning(`file size can not exceed ${size}MB!`);
    return false;
  }
  return true;
};

//手动删除
const handleRemove = (file: UploadFile) => {
  const index = fileList.value.findIndex((item) => item.uid === file.uid);
  fileList.value.splice(index, 1);
};

const onRemove: UploadProps['onRemove'] = (uploadFile) => {
  console.log(uploadFile);
};

// 超出文件限制
const onExceed: UploadProps['onExceed'] = (files) => {
  if (limit != 1) {
    ElMessage.warning(`Upload up to ${size} files!`);
    return;
  }
  uploadRef.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  uploadRef.value!.handleStart(file);
  uploadRef.value.submit();
};

// 上传成功
const onSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
  uploadFiles
) => {
  if (response.code === 1) {
    const index = fileList.value.findIndex(
      (item) => item.uid === uploadFile.uid
    );
    fileList.value.splice(index, 1, {
      ...uploadFile,
      src: response.url,
    });
    ElMessage.success(`${uploadFile.name} upload successfully!`);
  } else {
    ElMessage.error(`${uploadFile.name} upload failed`);
  }
};

const onError: UploadProps['onError'] = (error, uploadFile) => {
  ElMessage.error(`${uploadFile.name} upload failed, ${error}`);
};

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};
</script>

<style lang="scss" scoped>
.preViewImg {
  max-height: 600px;
  display: block;
  margin: 0 auto;
}
</style>
