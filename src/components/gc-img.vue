<template>
  <el-image :src="src" :preview-teleported="true" :preview-src-list="previewSrcList">
    <template #error>
      <div class="image-slot">
        <el-icon><icon-picture /></el-icon>
      </div>
    </template>
  </el-image>
</template>

<script setup lang="ts" name="base-image">
import { Picture as IconPicture } from '@element-plus/icons-vue'
const {src, previewSrcList} = defineProps<{
  src: string,
  previewSrcList?: string[]
}>()

</script>

<style lang="scss" scoped></style>
