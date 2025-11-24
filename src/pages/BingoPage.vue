<script lang="ts" setup>
import BingoLetterColumn from '@/components/BingoLetterColumn.vue'
import { BingoLetter } from '@/types/bingo-types'
import { useBingoStore } from '@/stores/bingo/bingo'

const bingoStore = useBingoStore()

const handleGameProgression = () => {
  if (bingoStore.gameComplete) {
    bingoStore.resetGame()
  } else {
    bingoStore.getNextNumber()
  }
}
</script>

<template>
  <main>
    <div id="bingo-wrapper">
      <div id="bingo-letter-columns">
        <BingoLetterColumn
          v-for="letter in Object.values(BingoLetter)"
          :key="letter"
          :letter="letter"
        />
      </div>

      <div id="footer">
        <div class="number-indicator-wrapper">
          <div
            id="previous-number"
            class="number-indicator"
            :class="{ transparent: !bingoStore.previousNumber }"
          >
            <p>
              {{
                bingoStore.previousNumber
                  ? bingoStore.getLetterForNumber(bingoStore.previousNumber)
                  : ''
              }}{{ bingoStore.previousNumber }}
            </p>
          </div>
        </div>

        <button id="next-number-btn" @click="handleGameProgression">
          {{ `${bingoStore.gameComplete ? 'Reset Game' : 'Next Number'}` }}
        </button>

        <div class="number-indicator-wrapper">
          <div
            id="current-number"
            class="number-indicator"
            :class="{ transparent: !bingoStore.currentNumber }"
          >
            <p>
              {{
                bingoStore.currentNumber
                  ? bingoStore.getLetterForNumber(bingoStore.currentNumber)
                  : ''
              }}{{ bingoStore.currentNumber }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(29, 87, 64, 0.8) transparent;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(29, 87, 64, 0.8);
  border-radius: 4px;
  border: none;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(29, 87, 64, 1);
}

main {
  background-image: url('@/assets/pine_tree.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Arial', sans-serif;

  #bingo-wrapper {
    max-width: 80%;
    width: fit-content;
    max-height: 90%;
    height: fit-content;
    overflow: auto;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.1),
      0 1px 0 rgba(255, 255, 255, 0.2) inset;

    #bingo-letter-columns {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #footer {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 16px;

      .number-indicator-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 4rem;
      }

      #previous-number {
        --font-size: 0.9rem;

        padding-top: 1px;
      }
      #current-number {
        --font-size: 1.5rem;

        background-color: rgba(29, 87, 64, 0.8);
        border: 1px solid rgba(42, 105, 77, 0.6);
        color: rgba(255, 255, 255, 0.95);
        box-shadow:
          0 8px 32px rgba(29, 87, 64, 0.4),
          0 1px 0 rgba(66, 160, 71, 0.2) inset;
      }
      .number-indicator {
        width: calc(var(--font-size) * 2.5);
        height: calc(var(--font-size) * 2.5);
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

        p {
          margin: 0;
          padding: 0;
          font-size: var(--font-size);
          font-weight: bold;
        }
      }
      .transparent {
        opacity: 0;
      }

      #next-number-btn {
        padding: 12px 16px;
        margin: 0 16px;
        border-radius: 8px;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.75);
        font-size: 1rem;
        background-color: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow:
          0 8px 32px rgba(0, 0, 0, 0.1),
          0 1px 0 rgba(255, 255, 255, 0.2) inset;
      }
    }
  }
}
</style>
