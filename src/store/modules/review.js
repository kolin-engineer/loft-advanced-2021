const state = () => ({
  reviews: [],
});

const mutations = {
  fetch(state, data) {
    state.reviews = data;
  },
  add(state, data) {
    state.reviews.push(data);
  },
  delete(state, id) {
    state.reviews = state.reviews.filter((review) => review.id !== id);
  },
  update(state, updatedReview) {
    state.reviews = state.reviews.map((current) => {
      if (current.id === updatedReview.id) {
        return updatedReview;
      }
      return current;
    });
  },
};

const actions = {
  create: async function({ commit, dispatch }, reviewFormData) {
    try {
      const { data } = await this.$axios.post("/reviews", reviewFormData);
      commit("add", data);
      dispatch("notification/show", { text: "Отзыв добавлен" }, { root: true });
    } catch (error) {
      console.warn(error);
    }
  },
  delete: async function({ commit, dispatch }, id) {
    try {
      await this.$axios.delete(`/reviews/${id}`);
      commit("delete", id);
      dispatch("notification/show", { text: "Отзыв удален" }, { root: true });
    } catch (error) {
      console.warn(error);
    }
  },
  update: async function({ commit, dispatch }, reviewFormData) {
    const id = reviewFormData.get("id");
    try {
      const {
        data: { review: updatedReview },
      } = await this.$axios.post(`/reviews/${id}`, reviewFormData);
      commit("update", updatedReview);
      dispatch("notification/show", { text: "Отзыв обновлен" }, { root: true });
    } catch (error) {
      console.warn(error);
    }
  },
  fetch: async function({ commit, rootState }) {
    const id = rootState.auth.user.id;
    try {
      const { data } = await this.$axios.get(`/reviews/${id}`);
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
