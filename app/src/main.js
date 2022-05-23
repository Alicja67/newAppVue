import Vue from 'vue';

import App from './AppComponent.vue';
import router from './router';
import store from './store';
import MdCard from 'vue-material';
import * as VueGoogleMaps from 'vue2-google-maps';
// import 'vue-material/dist/vue-material.min.css';
// import 'vue-material/dist/theme/default.css';

// Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'YOUR_API_TOKEN',
    libraries: 'places',
  },
});

Vue.use(MdCard);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
