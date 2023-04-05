<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { Ref } from 'vue';

import type { SelectedCard } from '@/types/card.types';
import { shuffle } from '@/helpers/images';
import useImages from '@/composables/images';
import Actions from '@/components/Actions.vue';
import Card from '@/components/Cards/Card.vue';
import EmptyCard from '@/components/Cards/EmptyCard.vue';

const { fetchImages, result, loading, error } = useImages();
const images = computed(() => shuffle([...result.value, ...result.value]));
const isWin = computed(() => revealedCards.value.length === result.value.length);

const gameIsActive: Ref<boolean> = ref(false);
const moves: Ref<number> = ref(0);
const revealedCards: Ref<Array<string>> = ref([]);
let current: Ref<SelectedCard> = ref({
  index: null,
  id: '',
});
let end: Ref<SelectedCard> = ref({
  index: null,
  id: '',
});

const setCurrent = (index: number | null, id: string) => current.value = { index, id };
const setEnd = (index: number | null, id: string) => end.value = { index, id };

const newGame = async () => {
  moves.value = 0;
  revealedCards.value = [];
  setCurrent(null, '');
  setEnd(null, '');

  await fetchImages(10);
};

const start = () => {
  gameIsActive.value = true;
  newGame();
};

const reset = async () => {
  gameIsActive.value = false;
  newGame();
};

const setCard = (id: string, index: number): void => {
  if (current.value.id && end.value.id) return;

  moves.value++;

  if (current.value.id) {
    setEnd(index, id);

    if (current.value.id !== end.value.id) {
      setTimeout(() => {
        setCurrent(null, '');
        setEnd(null, '');
      }, 1000);
    }

    if (current.value.id === end.value.id) {
      revealedCards.value.push(current.value.id);
      setCurrent(null, '');
      setEnd(null, '');
    }

    return;
  }

  if (!end.value.id) {
    setCurrent(index, id);
    return;
  }
};

onMounted(async () => await fetchImages(10));
</script>

<template>
  <div class="block block--board">
    <template v-if="!loading && !error">
      <actions
        :moves="moves"
        :game-is-active="gameIsActive"
        @start="start"
        @reset="reset"
      />
      <div :class="`block__content ${!gameIsActive ? 'inactive' : null}`">
        <card
          v-for="(image, index) in images"
          :key="index"
          :index="index"
          :id="image.id"
          :url="image.url"
          :current="current"
          :end="end"
          :revealed-cards="revealedCards"
          @click="setCard(image.id, index)"
        />
      </div>
      <div
        v-if="isWin"
        class="block__message"
      >
        <h2 class="block__title">
          Congratulations! 🥳
        </h2>

        <button
          class="btn block__btn"
          @click="start"
        >
          Start new game
        </button>
      </div>
    </template>
    <template v-if="loading || error">
      <p class="block__description">
        <template v-if="loading">
          Loading
        </template>
        <template v-if="error">
          {{ error }}
        </template>
      </p>
      <div class="block__content">
        <empty-card
          v-for="n in 20"
          :key="n"
        />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import 'board';
</style>
