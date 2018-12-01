<template>
  <div class="score">
    <div class="player">⚫ {{ BLACK }} {{ game.getScore(BLACK)}}</div>
    <div class="player">⚪ {{ WHITE }} {{ game.getScore(WHITE)}}</div>
  </div>
</template>

<script>
import game from "../services/game"
import { BLACK, WHITE } from "../constants/gameStates.js"

export default {
  name: 'RScore',

  data: () => ({
    game,
    BLACK,
    WHITE
  }),
}
</script>

<style>
.score {
  margin: 1em 0;
  display: flex;
}
.player {
  padding: 0 1em;
}
</style>