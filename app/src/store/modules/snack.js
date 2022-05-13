let defaults = {
  time: 2000,
  delay: 500,
  text: '',
};

const state = {
  snack: null,
};

const getters = {
  snack: (state) => state.snack,
};

const actions = {
  snack({ commit }, options) {
    defaults = { ...defaults, ...options };

    setTimeout(() => {
      commit('SET_SNACK', defaults);
      setTimeout(() => {
        commit('SET_SNACK', null);
      }, defaults.time);
    }, defaults.delay);
  },
};

const mutations = {
  SET_SNACK: (state, text) => (state.snack = text),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
