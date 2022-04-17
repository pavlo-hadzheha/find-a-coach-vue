import { RouteRecordRaw } from 'vue-router'

export const coachDetailsRouteNames = {
  coachDetails: 'coachDetails',
  coachContact: 'coachContact'
}

export const coachDetailsRoutes: RouteRecordRaw = {
  name: coachDetailsRouteNames.coachDetails,
  path: 'coaches/:id',
  props: true,
  component: () => import('./TheCoachDetails.vue'),
  children: [
    {
      name: coachDetailsRouteNames.coachContact,
      path: 'contact',
      props: true,
      component: () => import('./ContactCoach.vue')
    }
  ]
}
