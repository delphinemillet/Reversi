<template>
  <h2>Current player {{ game.currentPlayer }}</h2>
</template>

<script>
import game from "../services/game"

export default {
  name: 'RPlayer',

  data: () => ({
    game,
  }),
}
</script>

<style>
</style>