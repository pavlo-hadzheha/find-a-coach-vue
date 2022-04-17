import { RouteRecordRaw } from 'vue-router'

export const testViewRouteNames = {
  testView: 'testView'
}

export const testViewRoute: RouteRecordRaw = {
  name: testViewRouteNames.testView,
  path: '/testing',
  component: () => import('./TestView.vue')
}
