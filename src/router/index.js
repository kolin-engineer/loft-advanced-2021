import VueRouter from "vue-router";
import Vue from "vue";
import About from "../admin/views/About.vue";
import Cases from "views/Cases.vue";
import Testimonials from "views/Testimonials.vue";
Vue.use(VueRouter);

export const routes = [
  { path: "/", redirect: { name: "About" }, name: "Admin" },
  { path: "/about", component: About, name: "About" },
  { path: "/cases", component: Cases, name: "Cases" },
  { path: "/testimonials", component: Testimonials, name: "Testimonials" },
];
const router = new VueRouter({
  routes,
});

export default router;
