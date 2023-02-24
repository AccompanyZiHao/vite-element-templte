<template>
  <div class="login">
    <h2>login</h2>
    <el-form
      :model="form"
      ref="formRef"
      :rules="rules"
      label-width="0"
      :inline="false"
      class="form"
      size="large"
    >
      <el-form-item label="" prop="username">
        <el-input
          v-model="form.username"
          placeholder="Please enter id"
          style="width: 400px"
          :prefix-icon="UserFilled"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="pwd">
        <el-input
          v-model="form.pwd"
          placeholder="Please enter password"
          style="width: 400px"
          :type="pwdStatus ? 'password' : 'text'"
          :prefix-icon="Lock"
        >
          <template #append>
            <el-button
              :icon="pwdStatus ? Hide : View"
              @click="pwdStatus = !pwdStatus"
            />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="" prop="code">
        <el-input
          v-model="form.code"
          placeholder="Please enter code"
          style="width: 400px"
          :prefix-icon="Warning"
        >
          <template #append>
            <img :src="captchaSrc" alt="" class="codeImg" @click="getCaptcha" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="onSubmit(getCaptcha)"
          style="width: 400px"
          >login</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="login">
import { ref } from 'vue';
import { UserFilled, View, Hide, Warning, Lock } from '@element-plus/icons-vue';
import { useCaptcha, useLogin } from './hook';
import { useRouter } from 'vue-router';

const router = useRouter();
const { captchaSrc, getCaptcha } = useCaptcha();
const { rules, onSubmit, formRef, form, loading } = useLogin(router);
const pwdStatus = ref(true);
</script>

<style lang="scss" scoped>
.login {
  background-color: #2d3a4b;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  h2 {
    margin-top: 250px;
    color: #fff;
    font-size: 30px;
  }
  .form {
    margin-top: 60px;
    .codeImg {
      height: 30px;
      display: block;
    }
  }
}
</style>
