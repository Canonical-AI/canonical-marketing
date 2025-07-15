import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import SignupPage from './components/SignupPage.vue'
import AboutPage from './components/AboutPage.vue'
import ManageAccountPage from './components/ManageAccountPage.vue'
import PrivacyPage from './components/PrivacyPage.vue'
import TermsPage from './components/TermsPage.vue'
import SecurityPage from './components/SecurityPage.vue'

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
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: PrivacyPage
  },
  {
    path: '/terms',
    name: 'Terms',
    component: TermsPage
  },
  {
    path: '/security',
    name: 'Security',
    component: SecurityPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 