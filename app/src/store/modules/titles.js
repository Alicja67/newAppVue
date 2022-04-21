// import axios from 'axios';

import axios from 'axios';

// import store from "store";

const state = {
  titles: [],
  newTitles: [],
};

const getters = {
  allTitles: (state) => state.titles,
  newTitles: (state) => state.newTitles,
};

const actions = {
  async fetchTitles({ commit }) {
    const response = await axios.get('https://images-api.nasa.gov/search?q=space&media_type=image');
    console.log(response.data.collection.items);
    commit('SET_TITLE', response.data.collection.items);
  },
  async addTitle({ commit }, title) {
    const response = await axios.post('http://localhost:3000/title', { title });
    commit('NEW_TITLE', response.data.newTitle.title);
  },
};

const mutations = {
  SET_TITLE: (state, titles) => (state.titles = titles),
  NEW_TITLE: (state, title) => state.newTitles.push(title),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
