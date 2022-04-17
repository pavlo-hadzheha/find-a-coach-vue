import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { routeGuard } from './route-guard'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { routeNames } from '@/router/route-names'

import { authRoutes } from '@/views/auth/auth.routes'
import { messagesListRoute } from '@/views/messages-list/messages-list.route'
import { dialogsListRoute } from '@/views/dialogs-list/dialogs-list.routes'
import { profileRoutes } from '@/views/profile/profile.routes'
import { coachDetailsRoutes } from '@/views/coach-details/coach-details.routes'
import { coachesListRoutes } from '@/views/coaches-list/coaches-list.routes'
import { testViewRoute } from '@/views/test/test-view.router'

export const defaultLayoutRoutes: RouteRecordRaw = {
  path: '/',
  name: routeNames.rootPage,
  redirect: {
    name: routeNames.coachesList
  },
  component: DefaultLayout,
  children: [
    coachDetailsRoutes,
    coachesListRoutes,
    messagesListRoute,
    dialogsListRoute,
    authRoutes,
    profileRoutes,
    testViewRoute
  ]
}
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  defaultLayoutRoutes
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(routeGuard)

export * from './route-names'
