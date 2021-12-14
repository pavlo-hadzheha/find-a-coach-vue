import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { TheRequests, TheCoaches, TheAuth } from '@/pages';
import { RegisterForm, LoginForm } from '@/components/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/coaches',
    name: 'TheCoaches',
  },
  {
    path: '/coaches',
    name: 'About',
    component: TheCoaches
  },
  {
    path: '/requests',
    name: 'TheRequests',
    component: TheRequests
  },
  {
    path: '/auth',
    name: 'TheRequests',
    component: TheAuth,
    children: [
      { path: '', redirect: '/auth/login' },
      { path: 'login', name: "Login", component: LoginForm },
      { path: 'register', name: "Register", component: RegisterForm }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
