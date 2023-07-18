import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./routers";
import { updateToken } from "./auth";

async function boot() {
  const refreshToken = localStorage.getItem("refresh-token");
  if (refreshToken) {
    await updateToken(refreshToken);
  }
  const app = createApp(App);
  app.use(store);
  app.use(router());
  app.mount("#app");
}

boot();
