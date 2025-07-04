import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import SignupPage from './components/SignupPage.vue'
import AboutPage from './components/AboutPage.vue'
import ManageAccountPage from './components/ManageAccountPage.vue'

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
  },
  {
    path: '/manage-account',
    name: 'ManageAccount',
    component: ManageAccountPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 