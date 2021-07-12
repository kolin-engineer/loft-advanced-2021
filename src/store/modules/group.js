const state = () => ({
  all: [],
});

const mutations = {
  createSkill(state, skill) {
    const mapGroup = (group) => {
      if (group.id === skill.category) {
        group.skills.push(skill);
      }
      return group;
    };
    state.all.map(mapGroup);
  },
  updateSkill(state, skill) {
    const targetGroupIndex = state.all.findIndex(
      (group) => group.id === skill.category
    );
    const targetSkillIndex = state.all[targetGroupIndex].skills.findIndex(
      (el) => el.id === skill.id
    );
    state.all[targetGroupIndex].skills[targetSkillIndex] = { ...skill };
  },
  deleteSkill(state, skill) {
    const mapGroup = (group) => {
      if (group.id === skill.category) {
        group.skills = group.skills.filter(
          (skillEl) => skillEl.id !== skill.id
        );
      }
      return group;
    };
    state.all.map(mapGroup);
  },
  fetch(state, payload) {
    state.all = payload.all;
  },
};

const actions = {
  async create({ dispatch }, { title }) {
    try {
      const res = await this.$axios.post("/categories", { title });
      dispatch("fetch");
    } catch (err) {
      console.warn(err);
    }
  },
  async update({ dispatch }, { id, title }) {
    try {
      const res = await this.$axios.post(`/categories/${id}`, { title });
    } catch (err) {
      console.warn(err);
    }
  },
  async delete({ dispatch }, { id }) {
    try {
      const res = await this.$axios.delete(`/categories/${id}`);
      dispatch("fetch");
    } catch (err) {
      console.warn(err);
    }
  },
  async fetch({ commit }) {
    try {
      const res = await this.$axios.get("/categories/467");
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
