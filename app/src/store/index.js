import Vue from 'vue';
import Vuex from 'vuex';

import tags from './modules/tags';

//Load Vuex
Vue.use(Vuex);

//Create store
export default new Vuex.Store({ modules: { tags } });
