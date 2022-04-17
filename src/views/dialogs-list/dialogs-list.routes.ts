import { RouteRecordRaw } from 'vue-router'

export const dialogsListRouteNames = {
  dialogs: 'dialogs'
}

export const dialogsListRoute: RouteRecordRaw = {
  name: dialogsListRouteNames.dialogs,
  path: 'dialogs',
  component: () => import('./DialogList.vue')
}
