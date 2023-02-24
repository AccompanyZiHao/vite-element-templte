import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import './style.css';
import App from './App.vue';
import router from './router/index';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import gcTable from '@/components/gc-table.vue';
import gcImg from '@/components/gc-img.vue';
import directives from './directive';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

directives(app);
app.use(router);
app.use(pinia);
app.component('gcTable', gcTable);
app.component('gcImg', gcImg);
app.mount('#app');
