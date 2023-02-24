<template>
  <el-dialog
    :title="title"
    v-model="visible"
    :width="width"
    align-center
    :append-to-body="true"
    :close-on-click-modal="false"
  >
    <slot></slot>
    <template #footer>
      <el-button @click="cancel">Cancel</el-button>
      <el-button type="primary" @click="confirm" v-preventDbClick>confirm</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="base-dialog">
import { ref } from 'vue';

const visible = ref(false);
const { title, width } = withDefaults(
  defineProps<{
    title?: string;
    width?: string;
    destroyOnClose?: boolean;
  }>(),
  {
    title: '',
    width: '60%',
  }
);

const emit = defineEmits<{
  (event: 'confirm'): void;
  (event: 'cancel'): void;
}>();

function cancel() {
  visible.value = false;
  emit('cancel');
}
function confirm() {
  emit('confirm');
}

function show(status: boolean) {
  visible.value = status;
}

defineExpose({
  show,
});
</script>

<style lang="scss" scoped></style>
