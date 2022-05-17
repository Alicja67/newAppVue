import axios from 'axios';

const state = {
  users: [],
};

const getters = {
  users: (state) => state.users,
};

const actions = {
  async fetchUser({ commit }) {
    try {
      const response = await axios.get('http://localhost:3000/users');
      console.log('fetch-users', response.data);
      commit('SET_USERS', response.data);
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
          commit('SET_USERS', response.data);
        }, 2000);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  },
  async addUser({ commit }, { firstName, lastName, email, login, password }) {
    try {
      const response = await axios.post('http://localhost:3000/user/register', {
        firstName,
        lastName,
        email,
        login,
        password,
      });
      console.log('set-add', response.data);
      commit('NEW_USER', response.data);
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
          commit('NEW_USER', response.data);
        }, 2000);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  },
};

const mutations = {
  SET_USERS: (state, users) => (state.users = users),
  NEW_USER: (state, { firstName, lastName, email, login, password }) =>
    state.users.push({ firstName, lastName, email, login, password }),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
