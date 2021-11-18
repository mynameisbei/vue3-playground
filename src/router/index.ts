import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { MenuRoute } from '../types';
import Test from '../views/test.vue';
import Files from '../views/files.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/' + MenuRoute.file,
  },
  {
    path: '/' + MenuRoute.file,
    name: MenuRoute.file,
    component: Files,
  },
  {
    path: '/' + MenuRoute.photo,
    name: MenuRoute.photo,
    component: Test,
  },
  {
    path: '/' + MenuRoute.collection,
    name: MenuRoute.collection,
    component: Test,
  },
  {
    path: '/' + MenuRoute.coffer,
    name: MenuRoute.coffer,
    component: Test,
  },
  {
    path: '/' + MenuRoute.share,
    name: MenuRoute.share,
    component: Test,
  },
  {
    path: '/' + MenuRoute.recycle,
    name: MenuRoute.recycle,
    component: Test,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
