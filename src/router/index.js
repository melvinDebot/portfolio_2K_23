import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '../views/ProjectView.vue'
import ContactView from '../views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/project/:name',
      name: 'project',
      component: ProjectView,
      meta: { transitionName: 'fade' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    }
  ]
})

export default router
