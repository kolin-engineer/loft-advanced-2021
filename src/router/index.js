import VueRouter from "vue-router";
import Vue from "vue";
import About from "../admin/views/About.vue";
import TheHeader from "@/admin/components/TheHeader/TheHeader.vue";
import Cases from "views/Cases.vue";
import Testimonials from "views/Testimonials.vue";
import Login from "views/Login.vue";
Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "About",
    components: {
      header: TheHeader,
      default: About,
    },
  },
  { path: "/login", components: { login: Login }, name: "Login" },
  { path: "/cases", component: Cases, name: "Cases" },
  { path: "/testimonials", component: Testimonials, name: "Testimonials" },
];
const router = new VueRouter({
  routes,
});

// router.beforeEach((to, from, next) => {
//   next();
// });
export default router;
