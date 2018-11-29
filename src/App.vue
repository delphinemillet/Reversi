<template>
  <div id="app">
    <h1>Reversi</h1>
    <Player />
    <Board />
  </div>
</template>

<script>
import Player from './components/Player.vue'
import Board from './components/Board.vue'
import game from "./services/game"

export default {
  name: 'app',
  components: {
    Player,
    Board,
  },
  beforeCreate() {
    game.initGame()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
