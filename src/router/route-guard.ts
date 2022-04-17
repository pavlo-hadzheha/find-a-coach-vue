import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { authStore } from '@/store'
import { routeNames } from '@/router/route-names'

export const routeGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (!authStore.userIsAuthenticated) {
    if (to.name === routeNames.dialogs || to.name === routeNames.profile) {
      next({ name: routeNames.coachesList })
    } else {
      next()
    }
  } else {
    next()
  }
}
