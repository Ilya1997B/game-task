import { createStore } from "vuex";

const store = createStore({
  state: {
    isAuthenticated: false,
    userToken: "",
  },
  mutations: {
    logOut(state) {
      state.isAuthenticated = false;
      state.userToken = "";
    },

    logIn(state, token) {
      state.isAuthenticated = true;
      state.userToken = token;
    },

    updateToken(state, token) {
      state.userToken = token;
    },
  },

  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
  },
});

export default store;
