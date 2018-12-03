<template>
  <div id="app">
    <h1>Reversi</h1>
    <Player />
    <div class="game">
      <Board />
      <Score />
      <Skip @onSkip="skip" :error="game.error" :player="game.currentPlayer"/>
    </div>
  </div>
</template>

<script>
import Player from './components/Player.vue'
import Board from './components/Board.vue'
import Score from './components/Score.vue'
import Skip from './components/Skip'
import game from "./services/game"

export default {
  name: 'app',
  components: {
    Player,
    Board,
    Score,
    Skip,
  },
  beforeCreate() {
    game.initGame()
  },
  methods: {
    skip: () => game.skip()
  },
  data() {
    return {
      game,
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #35495e;
}

.game {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
