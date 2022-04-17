import { RouteRecordRaw } from 'vue-router'

export const messagesListRouteNames = {
  messagesList: 'messagesList'
}

export const messagesListRoute: RouteRecordRaw = {
  name: messagesListRouteNames.messagesList,
  path: 'dialogs/:dialogUID',
  props: true,
  component: () => import('./MessageList.vue')
}
