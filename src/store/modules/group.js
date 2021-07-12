const state = () => ({
  all: [],
});

const mutations = {
  createGroup(state, group) {
    state.all.unshift(group);
  },
  deleteGroup(state, id) {
    state.all = state.all.filter((group) => group.id !== id);
  },
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
  async create({ commit, dispatch }, { title }) {
    try {
      const res = await this.$axios.post("/categories", { title });
      commit("createGroup", { ...res.data, skills: [] });
      dispatch(
        "notification/show",
        { text: `Группа [${title}] добавлена` },
        { root: true }
      );
    } catch (err) {
      console.warn(err);
    }
  },
  async update({ dispatch, commit }, { id, title }) {
    try {
      const res = await this.$axios.post(`/categories/${id}`, { title });
      dispatch(
        "notification/show",
        { text: `Группа [${title}] обновлена` },
        { root: true }
      );
    } catch (err) {
      console.warn(err);
    }
  },
  async delete({ commit, dispatch }, { id }) {
    try {
      const res = await this.$axios.delete(`/categories/${id}`);
      commit("deleteGroup", id);
      dispatch(
        "notification/show",
        { text: `Группа удалена`, type: "warning" },
        { root: true }
      );
    } catch (err) {
      console.warn(err, err.response);
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
