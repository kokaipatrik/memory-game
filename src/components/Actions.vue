<script setup lang="ts">
defineProps<{
  moves: number;
  gameIsActive: boolean;
}>();

const emit = defineEmits(['start', 'reset']);

const start = () => emit('start');
const reset = () => emit('reset');
</script>

<template>
  <div class="block block--actions">
    <button
      v-if="!gameIsActive"
      class="btn block__btn"
      @click="start"
    >
      Start
    </button>
    <button
      v-if="gameIsActive"
      class="btn block__btn"
      @click="reset"
    >
      Reset
    </button>

    <ul class="list list--info">
      <li class="list__item">
        <p class="list__name">
          Moves
        </p>
        <p class="list__value">
          {{ moves }}
        </p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>

.block--actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  margin: 15px 0;
}

.list--info {
  display: flex;
  align-items: center;
  gap: 24px;

  .list__item {
    display: flex;
    gap: 12px;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
  }

  .list__value {
    color: lighten(#000, 35%);
  }
}

@media (min-width: 560px) {
  .block--actions {
    margin: 25px 0;
  }

  .list--info {
    .list__item {
      font-size: 16px;
    }
  }
}
</style>
