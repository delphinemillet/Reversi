<template>
  <div>
  <button @click="$emit('onSkip')" class="button">skip</button>
  <div v-if="error" class="error">{{ player }} can play!</div>
  </div>
</template>

<script>
export default {
  name: 'RSkip',

  props: {
    error: Boolean,
    player: String,
  },
}
</script>

<style>
.button {
  background: #35495e;
  color: white;
  cursor: pointer;
  border: none;
  padding: 1em 2em;
  border-radius: .5em;
  text-transform: uppercase;
}
.button:hover {
  background: #043162;
  opacity: .8;
}
.error{
  margin: 1em;
  font-size: 1.5em;
  color: mediumvioletred;
}
</style>