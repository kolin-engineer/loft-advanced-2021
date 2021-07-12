const state = () => ({
  all: [],
});

const mutations = {};

const actions = {
  create: async function({ commit }, skill) {
    try {
      const res = await this.$axios.post("/skills", skill);
      const createdSkill = res.data;
      commit("group/createSkill", createdSkill, { root: true });
    } catch (error) {
      console.warn(error, error.response);
    }
  },
  update: async function({ commit }, skill) {
    try {
      const response = await this.$axios.post(`/skills/${skill.id}`, skill);
      commit("group/updateSkill", skill, { root: true });
      // Mutate via rootStore
    } catch (error) {
      console.warn(error, error.response);
    }
  },
  delete: async function({ commit }, skill) {
    try {
      const response = await this.$axios.delete(`/skills/${skill.id}`);
      commit("group/deleteSkill", skill, { root: true });
    } catch (error) {
      console.warn(error, error.response);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
