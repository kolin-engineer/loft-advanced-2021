import Vue from "vue";
import Vuex from "vuex";
import group from "./modules/group";
import skill from "./modules/skill";
import auth from "./modules/auth";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    group,
    skill,
    auth,
  },

  state: {},
  getters: {},
  mutations: {},
  actions: {},
});
