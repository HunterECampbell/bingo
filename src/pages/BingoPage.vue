<script lang="ts" setup>
import { ref } from 'vue'
import BingoLetterColumn from '@/components/BingoLetterColumn.vue'
import { BingoLetter } from '@/types/bingo-types'
import { useBingoStore } from '@/stores/bingo/bingo'
import { usePullToRefresh } from '@/composables/usePullToRefresh'

const bingoStore = useBingoStore()

const bingoContentRef = ref<HTMLElement | null>(null)
const refreshIndicatorRef = ref<HTMLElement | null>(null)

usePullToRefresh(bingoContentRef, refreshIndicatorRef)

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
    <div id="bingo-card">
      <div id="refresh-indicator" ref="refreshIndicatorRef">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"
          />
        </svg>
      </div>

      <div id="bingo-content" ref="bingoContentRef">
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
  align-items: center;
  flex-direction: column;
  font-family: 'Arial', sans-serif;
  padding: 32px 16px;
  padding-top: 16px;
  box-sizing: border-box;

  #bingo-card {
    padding: 16px 8px;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.1),
      0 1px 0 rgba(255, 255, 255, 0.2) inset;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  #refresh-indicator {
    --size: 2.5rem;

    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-40px);
    width: var(--size);
    height: var(--size);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.1),
      0 1px 0 rgba(255, 255, 255, 0.2) inset;
    opacity: 0;
    pointer-events: none;
    z-index: 1000;
  }

  #bingo-content {
    max-width: calc(100vw - 32px - 48px);
    max-height: calc(100vh - 32px - 132px);
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: safe center;
    align-items: safe center;
    padding: 12px 16px;

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
