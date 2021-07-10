import Vue from "vue";
import App from "./App.vue";
import router from "../router";
import store from "../store/store";
import VueCompositionAPI from "@vue/composition-api";
import $axios from "../admin/requests";

Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;

store.$axios = $axios;

new Vue({
  el: "#app-root",
  router,
  store: store,
  render: (h) => h(App),
});
