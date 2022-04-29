import Vue from 'vue';
import Vuex from 'vuex';

import titles from './modules/titles';

//Load Vuex
Vue.use(Vuex);

//Create store
export default new Vuex.Store({ modules: { titles } });
