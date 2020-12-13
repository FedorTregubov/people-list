import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const rootPath = '/'

const routes: Array<RouteRecordRaw> = [
  {
    path: rootPath,
    name: 'home',
    component: () => import(/* webpackChunkName: 'Home' */ '@/views/Home.vue'),
    meta: {
      title: 'Home',
    },
  },
  {
    path: `${rootPath}history`,
    name: 'history',
    component: () =>
      import(/* webpackChunkName: 'History' */ '@/views/History.vue'),
    meta: {
      title: 'History',
    },
    props: true,
    // props: route => route.params.action,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(to => {
  document.title = to.meta.title
})

export default router
