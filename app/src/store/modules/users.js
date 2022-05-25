import axios from 'axios';

let defaults = {
  time: 2000,
  delay: 500,
  text: '',
  color: 'green',
};

const state = {
  users: [],
  user: null,
  snackTitle: null,
  loggedUser: null,
};

const getters = {
  users: (state) => state.users,
  user: (state) => state.user,
  snackUser: (state) => state.snackTitle,
  loggedUser: (state) => state.loggedUser,
};

const actions = {
  async updateUser({ commit }, { id, firstName, lastName, email, login }) {
    try {
      const response = await axios.put(`http://localhost:3000/user/${id}`, { firstName, lastName, email, login });
      console.log('updateUser', response.data);
      commit('UPDATE_USER', response.data);
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
          commit('UPDATE_USER', response.data);
        }, 2000);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  },
  async fetchUser({ commit }) {
    try {
      const response = await axios.get('http://localhost:3000/users');
      // console.log('fetch-users', response.data);
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
  async fetchLastAddedUser({ commit }, id) {
    try {
      const response = await axios.get(`http://localhost:3000/user/${id}`);
      // console.log('fetch-user', response.data);
      commit('SET_USER', response.data);
    } catch (err) {
      console.log(err.response);
    }
  },
  async fetchLoggedUser({ commit }, { email, id, username, fullname }) {
    console.log(email, id, username);
    commit('SET_LOGGED_USER', { email, id, username, fullname });
  },
  async addUser({ commit }, { firstName, lastName, email, login, password, id }) {
    try {
      const response = await axios.post('http://localhost:3000/user/register', {
        firstName,
        lastName,
        email,
        login,
        password,
        id,
      });
      console.log('new user in DB', response.data);
      commit('NEW_USER', response.data);
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data.message);
        console.log(error.response.status);
        // alert(error.response.data.message);
        const text = error.response.data.message;
        const time = 3000;
        defaults = { ...defaults, text, time };
        console.log('defaults', defaults);
        console.log(error.response.data.message);
        setTimeout(() => {
          commit('SET_SNACK_TITLE', defaults);
          setTimeout(() => {
            commit('SET_SNACK_TITLE', null);
          }, defaults.time);
        }, defaults.delay);
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
  SET_SNACK_TITLE: (state, text) => (state.snackTitle = text),
  SET_USERS: (state, users) => (state.users = users),
  SET_USER: (state, user) => (state.user = urser),
  // ERROR: (state, error) => (state.error = error),
  NEW_USER: (state, { firstName, lastName, email, login, password, id }) =>
    state.users.push({ firstName, lastName, email, login, password, id }),
  SET_LOGGED_USER: (state, loggedUser) => (state.loggedUser = loggedUser),
  UPDATE_USER: (state, updatedUser) => (state.loggedUser = { ...loggedUser, ...updatedUser }),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
