<template>
  <div @click="$emit('onClickTile')" class="tile">
    <div :class="state" />
  </div>
</template>

<script>
export default {
  name: 'RTile',
  props: {
    state: String
  },
}
</script>

<style>
.tile {
  width: 2em;
  height: 2em;
  border: 1px solid;
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