import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { TheRequests, TheCoaches, TheAuth, TheCoachDetails } from '@/pages';
import { RegisterForm, LoginForm, UserProfile } from '@/components/auth';
import ContactCoach from '@/components/coaches/ContactCoach.vue';
import MessageList from '@/components/dialogs/MessageList.vue';
import store from '../store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/coaches',
    name: 'TheCoaches',
    component: TheCoaches,
  },
  {
    path: '/requests',
    name: 'TheRequests',
    component: TheRequests
  },
  {
    path: '/requests/:dialogUID',
    name: 'MessageHistory',
    props: true,
    component: MessageList
  },
  {
    path: '/coaches/:id',
    name: 'TheCoachDetails',
    component: TheCoachDetails,
    props: true,
    children: [
      {
        path: 'contact',
        name: 'ContactCoach',
        props: true,
        component: ContactCoach
      }
    ]
  },
  {
    path: '/auth',
    name: 'TheAuth',
    component: TheAuth,
    children: [
      { path: '', redirect: '/auth/login' },
      { path: 'login', name: "Login", component: LoginForm },
      { path: 'register', name: "Register", component: RegisterForm }
    ]
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/',
    redirect: '/coaches',
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(function(to: any, from: any, next: any) {
  if(!store.getters['auth/userIsAuthenticated']) {
    if(to.name === 'TheRequests' || to.name === 'UserProfile') {
      next('/coaches');
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
