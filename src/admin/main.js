import Vue from "vue";
import App from "./App.vue";
import router from "../router";
import store from "../store";
import VueCompositionAPI from "@vue/composition-api";
import axios from "axios";

axios.defaults.baseURL = "https://webdev-api.loftschool.com/";

Vue.use(VueCompositionAPI);
Vue.use(axios);
Vue.config.productionTip = false;

new Vue({
  el: "#app-root",
  router,
  store: store,
  render: (h) => h(App),
});
