import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  base: './', // 打包路径
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
    extensions: ['.js', '.json', '.ts', 'tsx'],
  },
  server: {
    open: false,
    proxy: {
      // '/foreignUnion': {
      //   target: '',
      //   secure: false,
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace('^/foreignUnion', '/foreignUnion'),
      // },
    },
  },
});
