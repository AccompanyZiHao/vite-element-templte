import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./../views/login/index.vue'),
  },
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
