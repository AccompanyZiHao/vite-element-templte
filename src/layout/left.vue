<template>
  <el-menu
    :default-active="String(index)"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    class="menu"
  >
    <el-menu-item index="0" @click="goto(0)">
      <span>Agency member</span>
    </el-menu-item>
    <el-menu-item index="1" @click="goto(1)">
      <span>Agency Statistics</span>
    </el-menu-item>
    <!-- <el-menu-item index="2" @click="layoutHandle">
      <span>Logout</span>
    </el-menu-item> -->
  </el-menu>
</template>

<script setup lang="ts" name="left">
import { useMenuStore } from '@/store/menu';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter();

const menuStore = useMenuStore();
const { setMenuIndex } = menuStore;
const { index } = storeToRefs(menuStore);

const routerList = ['/member', 'statistics'];
function goto(index: number) {
  setMenuIndex(index);
  router.push(routerList[index]);
}
</script>

<style lang="scss" scoped>
.menu {
  height: 100vh;
}
</style>
