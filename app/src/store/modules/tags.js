// import axios from 'axios';

import axios from 'axios';

// import store from "store";

const state = {
  tags: [],
};

const getters = {
  allTags: (state) => state.tags,
};

const actions = {
  async fetchTags({ commit }) {
    const response = await axios.get('https://images-api.nasa.gov/search?q=space&media_type=image');
    console.log(response.data.collection.items);
    commit('setTags', response.data.collection.items);
  },
};

const mutations = {
  setTags: (state, tags) => (state.tags = tags),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
