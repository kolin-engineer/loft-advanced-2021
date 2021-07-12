const state = () => ({
  all: [],
});

const mutations = {};

const actions = {
  create: async function({ commit }, skill) {
    try {
      const res = await this.$axios.post("/skills", skill);
      commit("group/createSkill", skill, { root: true });
    } catch (error) {
      console.warn(error);
    }
  },
  update: async function({ commit }, skill) {
    try {
      const response = await this.$axios.post(`/skills/${skill.id}`, skill);
      commit("group/updateSkill", skill, { root: true });
      // Mutate via rootStore
    } catch (error) {
      console.warn(error);
    }
  },
  delete: async function({ commit }, skill) {
    try {
      const response = await this.$axios.delete(`/skills/${skill.id}`);
      commit("group/deleteSkill", skill, { root: true });
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
