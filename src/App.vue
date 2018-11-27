<template>
  <div id="app">
    <h1>Reversi</h1>
    <Board />
  </div>
</template>

<script>
import Board from './components/Board.vue'
import game from "./services/game"

export default {
  name: 'app',
  components: {
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
