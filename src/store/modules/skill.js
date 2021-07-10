const state = () => ({
  all: [],
});

const mutations = {
  mutationHandler(state, payload) {},
};

const actions = {
  actionHandler({ commit }, payload) {
    return new Promise((resolve) => {
      request().then((response) => {
        commit(mutationHandler, response);
        resolve(response);
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
