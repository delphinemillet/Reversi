<template>
  <div @click="$emit('onClickTile')">{{ state }}</div>
</template>

<script>
export default {
  name: 'RTile',
  props: {
    state: String
  },
}
</script>