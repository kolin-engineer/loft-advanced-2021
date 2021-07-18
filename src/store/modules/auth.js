const state = () => ({
  user: {},
});
const getters = {
  isLogged: (state) => {
    const tempUser = state.user;
    const isEmpty =
      Object.keys(tempUser).length === 0 && tempUser.constructor === Object;
    return isEmpty === false;
  },
};
const mutations = {
  login(state, user) {
    state.user = { ...user };
  },
};

const actions = {
  async logout() {
    localStorage.removeItem("token");
    location.reload();
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
