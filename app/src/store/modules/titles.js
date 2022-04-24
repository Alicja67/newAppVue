// import axios from 'axios';

import axios from 'axios';
import { title } from 'process';

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
    // console.log(response.data.collection.items);
    commit('SET_TITLE', response.data.collection.items);
  },
  async fetchNewTitles({ commit }) {
    const response = await axios.get('http://localhost:3000/titles');
    // console.log(response.data);
    commit('SET_NEWTITLES', response.data);
  },
  async addTitle({ commit }, title) {
    const response = await axios.post('http://localhost:3000/title', { title });
    commit('NEW_TITLE', response.data.newTitle);
  },
  async deleteTitle({ commit }, id) {
    const response = await axios.delete(`http://localhost:3000/title/${id}`);
    commit('DELETE_TITLE', id);
  },
  async updateTitle({ commit }, data) {
    const { id, title } = data;
    const response = await axios.put(`http://localhost:3000/title/${id}`, { title: title });

    commit('UPDATE_TITLE', { id: response.data._id, title: response.data.title });
  },
};

const mutations = {
  SET_TITLE: (state, titles) => (state.titles = titles),
  SET_NEWTITLES: (state, newTitles) => (state.newTitles = newTitles),
  NEW_TITLE: (state, title) => state.newTitles.unshift(title),
  DELETE_TITLE: (state, id) => (state.newTitles = state.newTitles.filter((title) => title._id !== id)),
  UPDATE_TITLE: (state, data) => {
    const { id, title } = data;
    return state.newTitles.map((o) => {
      if (o._id === id) {
        o.title = title;
      }

      return o;
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
