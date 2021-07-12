const state = () => ({
  user: {
    id: 467,
  },
  isAuthenticated: false,
});

const mutations = {
  fetchUser(state, user) {
    state.user = user;
  },
};

const actions = {
  async fetchUser({ commit }) {
    try {
      const res = await this.$axios.get("/user");
      commit("fetchUser", res.data.user);
    } catch (err) {
      console.warn(err);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
