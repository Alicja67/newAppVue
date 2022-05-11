import axios from 'axios';

const state = {
  contacts: [],
};

const getters = {
  contacts: (state) => state.contacts,
};

const actions = {
  async fetchContact({ commit }) {
    try {
      const response = await axios.get('http://localhost:3000/contacts');
      console.log('fetch-contacts', response.data);
      commit('SET_CONTACTS', response.data);
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data.message);
        console.log(error.response.status);
        // alert(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        // alert(error);
        setTimeout(function () {
          commit('SET_CONTACTS', response.data);
        }, 2000);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  },
  async addContact({ commit }, { author, email, title, message }) {
    try {
      const response = await axios.post('http://localhost:3000/contact/send-message', {
        title,
        author,
        message,
        email,
      });
      console.log('set-add', response.data);
      commit('NEW_CONTACT', response.data);
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data.message);
        console.log(error.response.status);
        // alert(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        alert(error);
        setTimeout(function () {
          commit('NEW_CONTACT', response.data);
        }, 2000);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  },
};

const mutations = {
  SET_CONTACTS: (state, contacts) => (state.contacts = contacts),
  NEW_CONTACT: (state, { author, email, title, message }) => state.contacts.push({ author, email, title, message }),
  // SET_ERROR: (state, errors) => (state.errors = errors),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
