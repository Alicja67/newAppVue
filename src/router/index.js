import AboutViewVue from '@/views/AboutView.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import SearchView from '../views/SearchView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'search',
    component: SearchView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutViewVue,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
