<template>
  <div class="sidebar">
    <div class="profile">
      <img class="user_photo" src="../../assets/user.jpg" alt="user" />
    </div>
    <div class="balance-info">Total balance: {{ balance }}</div>
    <div class="balance-info">Real balance: 0</div>
    <div class="balance-info">Bonus balance: 0</div>
    <div class="balance-info">Free spins: 0</div>
    <div class="login-form">
      <button class="sing-out" @click="singOut">Sing out</button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { mapMutations, mapState } from "vuex";
import { defineComponent } from "vue";

let counter = 0;

export default defineComponent({
  name: "sidebarComponent",
  data() {
    return {
      balance: "",
    };
  },
  async created() {
    await this.getBalance();
  },

  computed: {
    ...mapState(["userToken"]),
  },

  watch: {
    balance: {
      handler() {
        console.log("update balance");
      },
    },
  },

  methods: {
    async getBalance() {
      const res = await axios.get(
        `https://poker.evenbetpoker.com/api/web/v2/users/me/balance?clientId=default&auth=${this.userToken}`
      );
      this.balance = `${
        res.data.data[0].attributes.available - 1111 * counter
      }`;
      counter++;
      setTimeout(() => {
        this.getBalance();
      }, 30000);
    },

    ...mapMutations(["logOut"]),

    singOut() {
      this.logOut();
      this.$router.push("/login");
      localStorage.removeItem("refresh-token");
    },
  },
});
</script>

<style lang="sass">
.user_photo
  width: 100px

.sidebar
  background: #a0a0a0
  width: 300px
  height: 100%
  padding: 20px 0
  transition: all 0.5s ease

.wrapper
  width: 1650px
  display: flex

.sidebar .profile
  margin-bottom: 30px
  text-align: center

.sidebar .profile img
  display: block
  width: 100px
  height: 100px
  border-radius: 50%
  margin: 0 auto

.sidebar .profile h3
  color: #ffffff
  margin: 10px 0 5px

.balance-info
  color: #ffffff
  font-size: 25px
  margin: 20px 0 5px
  border: solid
  border-color: black

.sing-out
  margin-top: 10px
  width: 200px
  height: 40px
  border: 1px solid skyblue
  background: skyblue
  color: #fff
  cursor: pointer
  font-size: 30px
</style>
