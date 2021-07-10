import { onUpdated } from "@vue/composition-api";

const state = () => ({
  all: [],
});

const mutations = {
  fetch(state, payload) {
    state.all = payload.all;
  },
};

const actions = {
  async create({ dispatch }, { title }) {
    try {
      const res = await this.$axios.post("/categories", { title });
      console.log(`Ответ сервера после создания`, res.data);
      dispatch("fetch");
    } catch (err) {
      console.warn(err);
    }
  },

  async update({ dispatch }, { id, title }) {
    try {
      const res = await this.$axios.post(`/categories/${id}`, { title });
      console.log(res.data);
    } catch (err) {
      console.warn(err);
    }
  },
  async delete({ dispatch }, { id }) {
    try {
      const res = await this.$axios.delete(`/categories/${id}`);
      console.log(res.data);
      dispatch("fetch");
    } catch (err) {
      console.warn(err);
    }
  },
  async fetch({ commit }) {
    try {
      const res = await this.$axios.get("/categories");
      commit("fetch", { all: res.data });
    } catch (error) {
      console.warn("Не удалось получить список всех групп\n", error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
