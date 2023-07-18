<template>
  <div class="card-game">
    <img
      class="game-image"
      :src="game.attributes.image"
      :alt="game.attributes.title"
    />
    <div>
      <span
        :style="game.attributes.title.length > 30 ? 'font-size: 15px' : ''"
        >{{ game.attributes.title }}</span
      >
    </div>
    <button @click="playDemo(game.id)" class="play-demo">Play demo</button>
  </div>
</template>

<script lang="ts">
import { IGameInfo } from "@/pages/MainPage.vue";
import axios from "axios";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "gameCard",
  props: {
    game: {
      type: Object as PropType<IGameInfo>,
      required: true,
    },
  },
  methods: {
    async playDemo(gameId: string) {
      try {
        const resp = await axios.post(
          "https://poker.evenbetpoker.com/api/web/v2/casino/games/gameId/session-demo?clientId=default",
          {
            clientId: "default",
            gameId: gameId,
          }
        );
        window.location.href =
          resp.data.data[0].attributes["launch-options"]["game-url"];
      } catch (error) {
        alert("url not found");
      }
    },
  },
});
</script>

<style lang="sass">
.card-game
  border: solid
  border-color: black
  margin-bottom: 30px
  background-color: #4C4C4F
  color: white
  font-size: 20px
  border-radius: 40px
  margin: 0px 5px 5px 0px

.play-demo
  width: 120px
  height: 30px
  cursor: pointer
  background: transparent
  border: 1px solid black
  outline: none
  transition: 1s ease-in-out
  border-radius: 30px
  font-size: 20px
  color: white
  background-color: black
  margin-top: 5px
  margin-bottom: 5px
</style>
