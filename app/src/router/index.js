import AboutViewVue from '@/views/AboutView.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import SearchView from '../views/SearchView.vue';
import ContactForm from '../views/ContactForm.vue';

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
    path: '/contacts',
    name: 'contacts',
    component: ContactForm,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
