import VueRouter from "vue-router";
import Vue from "vue";
import TheHeader from "@/admin/components/TheHeader/TheHeader.vue";
import Reviews from "views/Reviews.vue";
import Login from "views/Login.vue";
import store from "../store/store.js";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "About",
    components: {
      header: TheHeader,
      default: () => import("views/About.vue"),
    },
  },
  {
    path: "/login",
    components: { login: Login },
    name: "Login",
    meta: {
      public: true,
    },
  },
  {
    path: "/cases",
    components: {
      header: TheHeader,
      default: () => import("views/Cases.vue"),
    },
    name: "Cases",
  },
  {
    path: "/reviews",
    components: {
      header: TheHeader,
      default: () => import("views/Reviews.vue"),
    },
    name: "Reviews",
  },
];
const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isToPublic = to.matched.some((route) => route.meta.public);
  const isLogged = store.getters["auth/isLogged"];
  if (!isToPublic && !isLogged) {
    const token = localStorage.getItem("token");
    const userApi = "https://webdev-api.loftschool.com/user";
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(userApi, { method: "GET", headers });
      if (response.ok !== true) {
        store.dispatch("notification/show", {
          text: "Время действия токена истекло",
          type: "warning",
        });
        throw new Error();
      }
      const { user } = await response.json();
      store.commit("auth/login", user);
    } catch (error) {
      localStorage.removeItem("token");
      router.replace({ name: "Login" });
    }
  }
  next();
});

export default router;
