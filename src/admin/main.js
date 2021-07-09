import Vue from "vue";
import App from "./App.vue";
import router from "../router";
import VueCompositionAPI from "@vue/composition-api";
import axios from "axios";

axios.defaults.baseURL = "https://webdev-api.loftschool.com/";

Vue.use(VueCompositionAPI);
Vue.use(axios);
new Vue({
  el: "#app-root",
  router,
  render: (h) => h(App),
});
