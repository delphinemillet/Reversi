<template>
  <table id="board">
    <tr v-for="(row, i) in game.rows" :key="i">
      <td v-for="(col, j) in game.cols" :key="j">
        <Tile @onClickTile="game.play(i, j)" :state="game.getState(i, j)" />
      </td>
    </tr>
  </table>
</template>

<script>
import game from "../services/game"
import Tile from './Tile'

export default {
  name: 'RBoard',
  components: {
    Tile,
  },

  data: () => ({
    game,
  }),
}
</script>

<style>
#board {
  margin: auto;
  background-color: darkcyan;
}
</style>