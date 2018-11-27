<template>
  <table id="board">
    <tr v-for="(row, i) in rows" :key="i">
      <td v-for="(col, j) in cols" :key="j">
        <Tile :state="getState(i, j)" />
      </td>
    </tr>
  </table>
</template>

<script>
import Tile from "./Tile";
import game from "../services/game"

export default {
  name: 'RBoard',

  components: {
    Tile,
  },

  data: () => ({
    rows: game.rows,
    cols: game.cols,
    state: game.state,
  }),

  methods: {
    getState: (i, j) => game.getState(i, j)
  },
}
</script>

<style>
#board {
  margin: auto;
}
</style>