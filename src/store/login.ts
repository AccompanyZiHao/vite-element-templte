import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useLoginStore = defineStore(
  'login',
  () => {
    const state = reactive({
      token: '',
    });
    function setToken(token: string) {
      state.token = token;
    }
    return { state, setToken };
  },
  {
    persist: true,
  }
);
