import { authRouteNames } from '@/views/auth/auth.routes'
import { dialogsListRouteNames } from '@/views/dialogs-list/dialogs-list.routes'
import { messagesListRouteNames } from '@/views/messages-list/messages-list.route'
import { profileRouteNames } from '@/views/profile/profile.routes'
import { coachesListRouteNames } from '@/views/coaches-list/coaches-list.routes'
import { coachDetailsRouteNames } from '@/views/coach-details/coach-details.routes'
import { testViewRouteNames } from '@/views/test/test-view.router'

export const routeNames = {
  rootPage: 'rootPage',
  ...authRouteNames,
  ...dialogsListRouteNames,
  ...coachesListRouteNames,
  ...messagesListRouteNames,
  ...profileRouteNames,
  ...coachDetailsRouteNames,
  ...coachesListRouteNames,
  ...testViewRouteNames
}
