import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import MainPage from "../pages/MainPage.vue";
import store from "@/store";

export default () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/login", component: LoginPage },
      { path: "/", component: MainPage },
    ],
  });

  router.beforeEach((to, from, next) => {
    if (store.getters.isAuthenticated) {
      if (to.path === "/login") {
        next("/");
        return;
      }
    } else if (to.path !== "/login") {
      next("/login");
      return;
    }
    next();
  });

  return router;
};
