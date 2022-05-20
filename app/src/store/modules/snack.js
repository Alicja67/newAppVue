let defaults = {
  time: 6000,
  delay: 500,
  text: '',
  color: '',
};

const state = {
  snack: [],
};

const getters = {
  snack: (state) => state.snack,
};

const actions = {
  snack({ commit }, { text, color }) {
    defaults = { ...defaults, ...{ text, color } };
    console.log('snack default', defaults);
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
