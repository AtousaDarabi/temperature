import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'temperature',
      component: () => import('@/views/TemperatureView.vue')
    }
  ]
})

export default router
