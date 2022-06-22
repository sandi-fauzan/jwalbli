import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ListKomentar from '../views/komentar/ListKomentar.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ListKomentar',
    name: 'ListKomentar',
    component: ListKomentar
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
