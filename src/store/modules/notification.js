const state = () => ({
  notification: {
    isShown: false,
    text: "",
    type: "",
    timer: "",
  },
});

const mutations = {
  set(state, notification) {
    state.notification = { ...notification };
  },
};

const actions = {
  show({ commit, state, dispatch }, notification) {
    if (state.timer) {
      clearTimeout(state.timer);
    }
    commit("set", {
      ...notification,
      isShown: true,
      timer: setTimeout(() => {
        dispatch("hide");
      }, 3000),
    });
  },
  hide({ commit, state }) {
    commit("set", { ...state.notification, isShown: false });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
