<script setup lang="ts">
import { BingoLetter } from '@/types/bingo-types'
import { useBingoStore } from '@/stores/bingo/bingo'

const bingoStore = useBingoStore()

const props = defineProps<{
  letter: BingoLetter
}>()
</script>

<template>
  <div class="bingo-letter-column">
    <h2 class="column-header">{{ letter }}</h2>

    <div class="column-body">
      <div v-for="number in bingoStore.numberRange[props.letter]" :key="number" class="number-cell">
        <div
          class="number-wrapper"
          :class="{ 'called-number': bingoStore.calledNumbers.includes(number) }"
        >
          <p class="number-text">{{ number }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bingo-letter-column {
  margin: 0 8px;

  .column-header {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-top: 0;
    margin-bottom: 8px;
  }

  .column-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    .number-wrapper {
      --font-size: 1rem;

      width: calc(var(--font-size) * 2);
      height: calc(var(--font-size) * 2);
      padding: 4px;
      margin-bottom: 4px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.1),
        0 1px 0 rgba(255, 255, 255, 0.2) inset;
      display: flex;
      justify-content: center;
      align-items: center;

      .number-text {
        font-size: var(--font-size);
        font-weight: bold;
      }
    }
    .called-number {
      background-color: rgba(29, 87, 64, 0.8);
      border: 1px solid rgba(42, 105, 77, 0.6);
      color: rgba(255, 255, 255, 0.95);
      box-shadow:
        0 8px 32px rgba(29, 87, 64, 0.4),
        0 1px 0 rgba(66, 160, 71, 0.2) inset;
    }
  }
}
</style>
