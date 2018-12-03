<template>
  <div
    @click="valid = false; $emit('onClickTile')"
    @mouseenter="valid = tileValidity"
    @mouseleave="valid = false"
    :class="{ valid }"
    class="tile"
  >
    <div :class="tileState" />
  </div>
</template>

<script>
import game from "../services/game"
export default {
  name: 'RTile',
  props: {
    state: Object,
  },

  data: () => ({
    game,
    valid: false,
  }),

  computed: {
    tileState() { return game.getState(this.state.i, this.state.j) },
    tileValidity() { return game.isValid(this.state.i, this.state.j) }
  }
}
</script>

<style>
.tile {
  width: 3em;
  height: 3em;
  background-color: darkcyan;
}
.valid {
  cursor: pointer;
  opacity: .5;
}
.BLACK {
  background-color: black;
  border-radius: 100%;
  height: 100%;
}
.WHITE {
  background-color: white;
  border-radius: 100%;
  height: 100%;

}
</style>