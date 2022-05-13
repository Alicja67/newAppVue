import Vue from 'vue';
import Vuex from 'vuex';

import titles from './modules/titles';
import contacts from './modules/contacts';
import snack from './modules/snack';

//Load Vuex
Vue.use(Vuex);

//Create store
export default new Vuex.Store({ modules: { titles, contacts, snack } });
