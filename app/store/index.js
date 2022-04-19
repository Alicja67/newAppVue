import Vuex from 'vue';
import Vue from 'vue';
// import space from './modules/space';

//Load Vuex
Vue.use(Vuex);

//Create store
export default new Vuex.Store({
  modules: {
    space
  }
});