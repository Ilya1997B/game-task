<template>
  <div class="wrapper">
    <sidebar-component v-if="pageIsLoading" />
    <game-cards class="cards-container" :games="games" />
  </div>
</template>

<script lang="ts">
import sidebarComponent from "../components/mainPageComponents/sidebarComponent.vue";
import gameCards from "../components/mainPageComponents/gameCards.vue";
import axios from "axios";
import { defineComponent } from "vue";

export interface IGameInfo {
  id: string;
  type: string;
  attributes: {
    title: string;
    provider: string;
    image: string;
  };
}

export default defineComponent({
  name: "MainPage",
  components: {
    sidebarComponent,
    gameCards,
  },
  data() {
    return {
      games: [] as IGameInfo[],
      pageIsLoading: false,
    };
  },
  async created() {
    try {
      const response = await axios.get(
        "https://poker.evenbetpoker.com/api/web/v2/casino/games?clientId=default"
      );
      this.games = response.data.data;
      this.pageIsLoading = true;
    } catch (error) {
      console.log(error);
    }
  },
});
</script>
