// import axios from 'axios';

import axios from 'axios';

// import store from "store";

const state = {
  titles: [],
};

const getters = {
  allTags: (state) => state.titles,
};

const actions = {
  async fetchTags({ commit }) {
    const response = await axios.get('https://images-api.nasa.gov/search?q=space&media_type=image');
    console.log(response.data.collection.items);
    commit('setTitles', response.data.collection.items);
  },
  async addTitle({ commit }, title) {
    const response = await axios.post('http://localhost:3000/contacts', { title, completed: false });
    commit('newTitle', response.data);
  },
};

const mutations = {
  setTitles: (state, titles) => (state.titles = titles),
  newTitle: (state, title) => state.titles.unshift(title),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
