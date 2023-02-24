<template>
  <div class="layout">
    <div class="menu">
      <left></left>
    </div>
    <div class="layout-r">
      <div class="layout-top-bar">
        <el-button type="primary" size="small" @click="layoutHandle"
          >Logout</el-button
        >
      </div>
      <div class="page">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="layout">
import left from './left.vue';
import { http } from '@/utils/http';
import { logout } from '@/api/login';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/store/login';

const { setToken } = useLoginStore();
const router = useRouter();

function layoutHandle() {
  ElMessageBox.confirm('Are you sure you want to logout?', 'confirm', {
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Confirm',
  })
    .then(() => {
      http.post(logout).then((data) => {
        if (data.code === 1) {
          ElMessage.success('logged out successfully');
          setToken('');
          router.push('/login');
        }
      });
    })
    .catch(() => {});
}
</script>

<style lang="scss" scoped>
.layout {
  .menu {
    width: 200px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #000;
  }
  .page {
    padding: 20px;
  }
  .layout-r {
    margin-left: 200px;
  }
  .layout-top-bar {
    border-bottom: 1px solid #f4f5f7;
    padding: 10px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
