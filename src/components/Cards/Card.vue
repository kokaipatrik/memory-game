<script setup lang="ts">
import type { SelectedCard } from '@/types/card.types';

defineProps<{
  id: string;
  url: string;
  index: number;
  current: SelectedCard;
  end: SelectedCard;
  revealedCards: Array<string>;
}>();
</script>

<template>
  <div :class="`card ${(index === current.index || index === end.index || revealedCards.includes(id)) ? 'is-active' : null}`">
    <div class="card__content">
      <figure class="card__figure">
        <img
          :src="url"
          :alt="id"
          class="card__img"
        >
      </figure>
      <div class="card__empty" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'card';
</style>
