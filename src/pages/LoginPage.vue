<template>
  <div class="login-form">
    <img class="logo" src="../assets/Logo.svg" alt="logo" />
    <h1>Sing In</h1>
    <div class="register">
      <input type="text" v-model="login" placeholder="Enter Login" />
      <input type="password" v-model="password" placeholder="Enter Password" />
      <button @click="singIn">Sing in</button>
    </div>
  </div>
</template>

<script lang="ts">
import { updateToken } from "@/auth";
import axios, { AxiosResponse } from "axios";
import { mapMutations } from "vuex";
import { defineComponent } from "vue";

export interface IAuthResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      token: string;
      "refresh-token": string;
    };
  }[];
}

export default defineComponent({
  name: "LoginPage",
  emits: ["sing-up"],
  data() {
    return {
      login: "",
      password: "",
    };
  },

  methods: {
    async singIn() {
      try {
        const response = await axios.post<any, AxiosResponse<IAuthResponse>>(
          "https://poker.evenbetpoker.com/api/web/v2/login?clientId=default",
          {
            clientId: "default",
            login: this.login,
            password: this.password,
          }
        );
        this.logIn(response.data.data[0].attributes.token);
        localStorage.setItem(
          "refresh-token",
          response.data.data[0].attributes["refresh-token"]
        );
        setTimeout(() => {
          updateToken(response.data.data[0].attributes["refresh-token"]);
        }, 800000);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    ...mapMutations(["logIn"]),
  },
});
</script>

<style lang="sass">
.register input
  width: 300px
  height: 40px
  padding-left: 20px
  display: block
  margin: 0 auto 30px auto
  border: 1px solid skyblue

.register button
  width: 320px
  height: 40px
  border: 1px solid skyblue
  background: skyblue
  color: #fff
  cursor: pointer

.logo
  width: 100px
</style>
