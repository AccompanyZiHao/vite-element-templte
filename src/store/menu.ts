import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => {
    return { index: 0 };
  },
  actions: {
    setMenuIndex(index: number) {
      this.index = index;
    },
  },
  persist: {
    key: 'menuIndex',
    storage: window.sessionStorage,
    paths: ['index'],
  },
});
