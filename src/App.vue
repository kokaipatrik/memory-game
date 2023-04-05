<script setup lang="ts">
import Board from '@/components/Board.vue';
</script>

<template>
  <main class="page page--board">
    <h1 class="page__title">
      Memory game 🐈
    </h1>
    <p class="page__description">
      Match the cats
    </p>
    <board />
  </main>
</template>

<style lang="scss">
@import 'app';
</style>
