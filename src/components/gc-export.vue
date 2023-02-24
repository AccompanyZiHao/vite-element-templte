<template>
  <el-button type="primary" @click="onExport">export </el-button>
</template>

<script setup lang="ts">

const { url, params } = withDefaults(
  defineProps<{ url: string; params: any }>(),
  {
    params: null,
  }
);

</script>

<style lang="scss" scoped></style>
