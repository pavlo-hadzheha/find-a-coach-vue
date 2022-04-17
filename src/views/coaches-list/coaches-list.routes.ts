import { RouteRecordRaw } from 'vue-router'

export const coachesListRouteNames = {
  coachesList: 'coachesList'
}

export const coachesListRoutes: RouteRecordRaw = {
  name: coachesListRouteNames.coachesList,
  path: '/coaches',
  component: () => import('./TheCoaches.vue')
}
