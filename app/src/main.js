import Vue from 'vue';

import App from './AppComponent.vue';
import router from './router';
import store from './store';
import MdCard from 'vue-material';
// import 'vue-material/dist/vue-material.min.css';
// import 'vue-material/dist/theme/default.css';

// Vue.config.productionTip = false;
Vue.use(MdCard);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
