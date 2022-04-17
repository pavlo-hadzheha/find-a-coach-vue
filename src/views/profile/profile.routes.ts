import { RouteRecordRaw } from 'vue-router'

export const profileRouteNames = {
  profile: 'profile'
}
export const profileRoutes: RouteRecordRaw = {
  name: profileRouteNames.profile,
  path: '/profile',
  component: () => import('./TheProfile.vue')
}
