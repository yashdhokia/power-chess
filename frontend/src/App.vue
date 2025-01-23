<script setup lang="ts">
import ChessBoardView from './components/ChessBoardView.vue';
import ClickAndMove from './components/ClickAndMove.vue';
import OverrideClickAndMove from './components/OverrideClickAndMove.vue';
</script>

<template>
  <div>
    <ChessBoardView />
    <ClickAndMove /> 
    <OverrideClickAndMove />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
