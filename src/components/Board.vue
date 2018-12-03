<template>
  <table id="board">
    <tr v-for="(row, i) in game.state" :key="i">
      <th class="row">{{ i }}</th>
      <td v-for="(col, j) in game.state[i]" :key="j">
        <th class="col" v-if="!i">{{ j }}</th>
        <Tile @onClickTile="game.play(i, j)" :state="{i, j}"/>
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
  border-spacing: 1px;
}
.row:first-child {
  padding-top: calc(3em / 2);
}
.col {
  display: inline-table;
}
</style>