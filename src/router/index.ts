import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const modulesConfig = import.meta.glob('@/views/**/config.ts', {
  import: 'default',
  eager: true,
});
const modulesCmp = import.meta.glob('@/views/**/index.vue');

const cmpObj = {};
Object.entries(modulesCmp).forEach(([k, cmp]) => {
  const key = k.match(/(?<=views).*(?=\/index.vue)/)[0].slice(1);
  cmpObj[key] = cmp;
});

const routerPage = Object.entries(modulesConfig).map(
  ([k, v]: [string, RouteRecordRaw]) => {
    const key = k.match(/(?<=views).*(?=\/config.ts)/)[0].slice(1);
    const path = key.replace(/\//g, '-');

    return {
      path: `${v.path || '/' + path}`,
      name: path,
      component: cmpObj[key],
    };
  }
);

const routes: RouteRecordRaw[] = [
  ...routerPage,
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/member',
        name: 'member',
        component: () => import('./../views/agency/member/index.vue'),
      },
      {
        path: '/statistics',
        name: 'statistics',
        component: () => import('./../views/agency/statistics/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
