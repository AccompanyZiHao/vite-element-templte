import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { unionLogExport } from '@/api/agency/statistics';
import { login, captcha } from '@/api/login';
import router from '@/router';
import { useLoginStore } from '@/store/login';
const { state, setToken } = useLoginStore();

const baseURL: string = import.meta.env.VITE_APP_BASE_URL || '/foreignUnion';

// let token = localStorage.getItem('token');
// 不需要提示的 api
const NoMessageApi = [unionLogExport];

const service = axios.create({
  withCredentials: true,
  timeout: 60000,
  baseURL,
});

service.interceptors.request.use(
  (config) => {
    if (config.url.indexOf(login) == -1 || config.url.indexOf(captcha) == -1) {
      config.headers['token'] = state.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (res) => {
    const {
      data,
      status,
      config: { url },
    } = res;
    if (status === 200) {
      const { code, msg } = data;
      // 导出 没有 code msg 等字段的接口
      if (NoMessageApi.includes(url)) {
        return Promise.resolve(res);
      }
      if (code !== 1) {
        ElMessage.error(msg || 'error');
        if (code === 900001) {
          setToken('');
          router.push('/login');
        }
      }
      return Promise.resolve(data);
    } else {
      return Promise.reject(res);
    }
  },
  (err) => {
    const { response } = err;
    if (response) {
      ElMessage.error(`${response.status}: ${response.statusText}`);
      return Promise.reject(response);
    } else {
      const msg = err.toString();
      if (msg == 'Cancel') {
        return false;
      }
      ElMessage.error(msg);
    }
    return false;
  }
);

export default service;
