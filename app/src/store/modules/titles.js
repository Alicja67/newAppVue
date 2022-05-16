import axios from 'axios';

let defaults = {
  time: 2000,
  delay: 500,
  text: '',
  color: 'green',
};

const state = {
  newTitles: [],
  nasaData: [],
  snackTitle: null,
};

const getters = {
  newTitles: (state) => state.newTitles,
  nasaData: (state) => state.nasaData,
  snackTitle: (state) => state.snackTitle,
};

const actions = {
  snackTitle({ commit }, options) {
    defaults = { ...defaults, ...options };

    setTimeout(() => {
      commit('SET_SNACK_TITLE', defaults);
      setTimeout(() => {
        commit('SET_SNACK_TITLE', null);
      }, defaults.time);
    }, defaults.delay);
  },
  async fetchNasaData({ commit }, searchValue) {
    const API = 'https://images-api.nasa.gov';
    try {
      const response = await axios.get(`${API}/search?q=${searchValue}&media_type=image`);
      // const debounceResponde = debounce(response);
      commit('SET_NASA', response.data.collection.items);
      // console.log('set-nasa', response.data.collection.items);
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        const text = error;
        defaults = { ...defaults, text };
        console.log('defaults', defaults);
        setTimeout(() => {
          commit('SET_SNACK_TITLE', defaults);
          setTimeout(() => {
            commit('SET_SNACK_TITLE', null);
          }, defaults.time);
        }, defaults.delay);
        setTimeout(function () {
          commit('NEW_TITLE', response.data);
        }, 2000);
        setTimeout(function () {
          commit('SET_NASA', response.data.collection.items);
        }, 2000);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  },
  async fetchNewTitles({ commit }) {
    try {
      const response = await axios.get('http://localhost:3000/titles');
      // console.log(response.data);
      commit('SET_NEWTITLES', response.data);
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        const text = error.response.data.message;
        defaults = { ...defaults, text };
        console.log(error.response.status);
        console.log('defaults', defaults);
        // this.snackTitle({ commit }, defaults);
        setTimeout(() => {
          commit('SET_SNACK_TITLE', defaults);
          setTimeout(() => {
            commit('SET_SNACK_TITLE', null);
          }, defaults.time);
        }, defaults.delay);
        // commit('SET_SNACK_TITLE', defaults);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        const text = error;
        defaults = { ...defaults, text };
        console.log('defaults', defaults);
        setTimeout(() => {
          commit('SET_SNACK_TITLE', defaults);
          setTimeout(() => {
            commit('SET_SNACK_TITLE', null);
          }, defaults.time);
        }, defaults.delay);
        setTimeout(function () {
          commit('NEW_TITLE', response.data);
        }, 2000);
        setTimeout(function () {
          commit('SET_NEWTITLES', response.data);
        }, 2000);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  },
  async addTitle({ commit }, title) {
    try {
      const response = await axios.post('http://localhost:3000/title', { title });
      console.log(response.data);
      commit('NEW_TITLE', response.data);
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        const text = 'Are you serious? Where it this amaizing new title?';
        const time = 3000;
        defaults = { ...defaults, text, time };
        console.log(error.response.status);
        console.log('defaults', defaults);
        console.log(error.response.data.message);
        setTimeout(() => {
          commit('SET_SNACK_TITLE', defaults);
          setTimeout(() => {
            commit('SET_SNACK_TITLE', null);
          }, defaults.time);
        }, defaults.delay);
        // alert(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        const text = error;
        defaults = { ...defaults, text };
        console.log('defaults', defaults);
        setTimeout(() => {
          commit('SET_SNACK_TITLE', defaults);
          setTimeout(() => {
            commit('SET_SNACK_TITLE', null);
          }, defaults.time);
        }, defaults.delay);
        setTimeout(function () {
          commit('NEW_TITLE', response.data);
        }, 2000);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  },
  async deleteTitle({ commit }, id) {
    try {
      const response = await axios.delete(`http://localhost:3000/title/${id}`);
      console.log(response.data);
      commit('DELETE_TITLE', id);
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        const text = error;
        defaults = { ...defaults, text };
        console.log('defaults', defaults);
        setTimeout(() => {
          commit('SET_SNACK_TITLE', defaults);
          setTimeout(() => {
            commit('SET_SNACK_TITLE', null);
          }, defaults.time);
        }, defaults.delay);
        setTimeout(function () {
          commit('NEW_TITLE', response.data);
        }, 2000);
        setTimeout(function () {
          commit('DELETE_TITLE', id);
        }, 2000);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  },
  async deleteAllTitles({ commit }) {
    try {
      const response = await axios.delete(`http://localhost:3000/titles`);
      commit('DELETE_ALL_TITLES');
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data.message);
        console.log(error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        const text = error;
        defaults = { ...defaults, text };
        console.log('defaults', defaults);
        setTimeout(() => {
          commit('SET_SNACK_TITLE', defaults);
          setTimeout(() => {
            commit('SET_SNACK_TITLE', null);
          }, defaults.time);
        }, defaults.delay);
        setTimeout(function () {
          commit('NEW_TITLE', response.data);
        }, 2000);
        setTimeout(function () {
          commit('DELETE_ALL_TITLES');
        }, 2000);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  },
  async updateTitle({ commit }, data) {
    try {
      const { id, title } = data;
      const response = await axios.put(`http://localhost:3000/title/${id}`, { title: title });
      console.log(response.data);
      commit('UPDATE_TITLE', { id: response.data._id, title: response.data.title });
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        const text = error;
        defaults = { ...defaults, text };
        console.log('defaults', defaults);
        setTimeout(() => {
          commit('SET_SNACK_TITLE', defaults);
          setTimeout(() => {
            commit('SET_SNACK_TITLE', null);
          }, defaults.time);
        }, defaults.delay);
        setTimeout(function () {
          commit('NEW_TITLE', response.data);
        }, 2000);
        setTimeout(function () {
          commit('UPDATE_TITLE', { id: response.data._id, title: response.data.title });
        }, 2000);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  },
};

const mutations = {
  // SET_TITLE: (state, titles) => (state.titles = titles),
  SET_SNACK_TITLE: (state, text) => (state.snackTitle = text),
  SET_NASA: (state, nasaData) => (state.nasaData = nasaData),
  SET_NEWTITLES: (state, newTitles) => (state.newTitles = newTitles),
  NEW_TITLE: (state, title) => state.newTitles.unshift(title),
  DELETE_TITLE: (state, id) => (state.newTitles = state.newTitles.filter((title) => title._id !== id)),
  DELETE_ALL_TITLES: (state, data) => (state.newTitles = []),
  UPDATE_TITLE: (state, data) => {
    const { id, title } = data;
    return state.newTitles.map((o) => {
      if (o._id === id) {
        o.title = title;
      }
      return o;
    });
  },
  // SET_CONTACTS: (state, contacts) => (state.contacts = contacts),
  // NEW_CONTACT: (state, contact) => state.contacts.unshift(contact),
  // SET_ERROR: (state, errors) => (state.errors = errors),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
