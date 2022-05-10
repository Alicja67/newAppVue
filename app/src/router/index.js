import AboutViewVue from '@/views/AboutView.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import SearchView from '../views/SearchView.vue';
import ContactForm from '../views/ContactForm.vue';
import SpaceVisitors from '../views/SpaceVisitors.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'search',
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
