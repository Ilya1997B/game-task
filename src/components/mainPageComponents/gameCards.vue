<template>
  <div class="cards-container">
    <div v-for="game in games.slice(0, 24)" :key="game.id">
      <game-card :game="game" />
    </div>
  </div>
</template>

<script lang="ts">
import { IGameInfo } from "@/pages/MainPage.vue";
import { PropType } from "vue";
import gameCard from "./gameCard.vue";

export default {
  emits: ["play-demo"],
  components: {
    gameCard,
  },
  data() {
    return {
      gameUrl: "",
    };
  },
  props: {
    games: {
      type: Array as PropType<IGameInfo[]>,
      required: true,
    },
  },
};
</script>

<style lang="sass">
.game-image
  width: 300px
  height: 200px
  max-width: 300px
  max-height: 200px
  border-radius: 35px

.main_cards
  width: 1350px
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: space-between
  margin-left: 40px

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

.play-demo:hover
  transition: 1s ease-in-out
  background: gray

.cards-container
  padding: 1vh 5px
  max-height: 95vh
  overflow-y: auto
  display: flex
  flex-wrap: wrap
  width: 1350px
  margin-left: 20px
</style>
