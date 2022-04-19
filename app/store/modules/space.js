// import axios from 'axios';

const state = {
  space: [
    {
      id: 1,
      title: Moon,
    },
    {
      id: 2,
      title: Sun,
    },
    {
      id: 3,
      title: Saturn,
    },
  ]
};

const getters = {
  allSpace: (state) => state.space
};

const actions = {};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
}
