import { RouteRecordRaw } from 'vue-router'
import BlankLayout from '@/layouts/BlankLayout.vue'

export const authRouteNames = {
  auth: 'auth',
  signIn: 'signIn',
  signUp: 'signUp',
  profile: 'profile'
}

export const authRoutes: RouteRecordRaw = {
  name: authRouteNames.auth,
  path: '/auth',
  redirect: { name: authRouteNames.signIn },
  component: BlankLayout,
  children: [
    {
      path: 'login',
      name: authRouteNames.signIn,
      component: () => import('./Login.vue')
    },
    {
      path: 'signUp',
      name: authRouteNames.signUp,
      component: () => import('./SignUp.vue')
    }
  ]
}
