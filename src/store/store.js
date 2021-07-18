import Vue from "vue";
import Vuex from "vuex";
import group from "./modules/group";
import skill from "./modules/skill";
import auth from "./modules/auth";
import notification from "./modules/notification";
import work from "./modules/work";
import review from "./modules/review";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    group,
    skill,
    auth,
    notification,
    work,
    review,
  },

  state: {},
  getters: {},
  mutations: {},
  actions: {},
});
