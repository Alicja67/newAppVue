import AboutViewVue from '@/views/AboutView.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import SearchView from '../views/SearchView.vue';
import MessageComponent from '../views/MessageComponent.vue';
import SpaceVisitors from '../views/SpaceVisitors.vue';
import ProfileUser from '../views/ProfileUser.vue';
import ChatVue from '../views/ChatVue.vue';
import RegistrationComponent from '../views/RegistrationComponent.vue';
import login from '../utils/loggingUtils';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: SearchView,
  },
  {
    path: '/tag',
    name: 'tag',
    component: AboutViewVue,
  },
  {
    path: '/message',
    name: 'message',
    component: MessageComponent,
  },
  {
    path: '/visitors',
    name: 'visitors',
    component: SpaceVisitors,
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatVue,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileUser,
  },
  {
    path: '/register',
    name: 'register',
    component: RegistrationComponent,
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'visitors' || to.name === 'tag') {
    login();
  }
  next();
});

export default router;
