import AboutViewVue from '@/views/AboutView.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import MainVue from '../MainVue.vue';
import SearchView from '../views/SearchView.vue';
import ContactForm from '../views/ContactForm.vue';
import SpaceVisitors from '../views/SpaceVisitors.vue';
import MapGoogle from '../views/MapGoogle.vue';
import RegistrationComponent from '../views/RegistrationComponent.vue';
import login from '../utils/loggingUtils';
import Keycloak from 'keycloak-js';

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
    component: ContactForm,
  },
  {
    path: '/visitors',
    name: 'visitors',
    component: SpaceVisitors,
  },
  {
    path: '/map',
    name: 'map',
    component: MapGoogle,
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
  if (to.name === 'tag' || to.name === 'visitors') {
    login();
  }
  next();
});

export default router;
