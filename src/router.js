import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './HomePage.vue'
import SignupPage from './SignupPage.vue'
import AboutPage from './AboutPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 