const state = () => ({
  works: [],
});

const mutations = {
  add: (state, work) => {
    state.works.push(work);
  },
  update: (state, work) => {
    state.works = state.works.map((workEl) => {
      if (workEl.id === work.id) {
        return work;
      }
      return workEl;
    });
  },
  delete: (state, id) => {
    state.works = state.works.filter((work) => work.id !== id);
  },
  fetch(state, data) {
    state.works = data;
  },
};

const actions = {
  create: async function({ commit, dispatch }, formData) {
    try {
      const { data: work } = await this.$axios.post("/works", formData);
      commit("add", work);
    } catch (error) {
      const text = error.response
        ? JSON.stringify(error.response.data.errors)
        : error;
      console.warn(error.response);
      dispatch("notification/show", { text, type: "error" }, { root: true });
    }
  },
  update: async function({ commit, dispatch }, formData) {
    try {
      const id = formData.get("id");
      const {
        data: { work },
      } = await this.$axios.post(`/works/${id}`, formData);
      commit("update", work);
      dispatch(
        "notification/show",
        { text: "Работа обновлена" },
        { root: true }
      );
    } catch (error) {
      console.warn(error);
    }
  },
  delete: async function({ commit, dispatch }, id) {
    try {
      const { data: work } = await this.$axios.delete(`/works/${id}`);
      commit("delete", id);
      dispatch("notification/show", { text: "Работа удалена" }, { root: true });
    } catch (error) {
      console.warn(error);
    }
  },

  fetch: async function({ commit, rootState }) {
    try {
      const { id } = rootState.auth.user;
      const { data } = await this.$axios.get(`/works/${id}`);
      commit("fetch", data);
    } catch (error) {
      console.warn(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
