import { defineStore } from 'pinia'
import { inRange, range } from 'lodash'
import { BingoLetter } from '@/types/bingo-types'

interface BingoState {
  calledNumbers: number[]
  currentNumber: number | null
  previousNumber: number | null
}

export const useBingoStore = defineStore('bingo', {
  state: (): BingoState => ({
    calledNumbers: [],
    currentNumber: null,
    previousNumber: null,
  }),

  getters: {
    gameComplete: (state) => state.calledNumbers.length === 75,
    numberRange: () => ({
      [BingoLetter.B]: range(1, 16),
      [BingoLetter.I]: range(16, 31),
      [BingoLetter.N]: range(31, 46),
      [BingoLetter.G]: range(46, 61),
      [BingoLetter.O]: range(61, 76),
    }),
    remainingNumbers(): number[] {
      const allNumbers = range(1, 76)
      return allNumbers.filter((num) => !this.calledNumbers.includes(num))
    },
  },

  actions: {
    getLetterForNumber(number: number): BingoLetter {
      if (inRange(number, 1, 16)) {
        return BingoLetter.B
      }
      if (inRange(number, 16, 31)) {
        return BingoLetter.I
      }
      if (inRange(number, 31, 46)) {
        return BingoLetter.N
      }
      if (inRange(number, 46, 61)) {
        return BingoLetter.G
      }
      return BingoLetter.O
    },
    getNextNumber() {
      if (this.gameComplete) {
        console.warn('All bingo numbers have been called!')
        return
      }

      const remaining = this.remainingNumbers

      if (remaining.length === 0) {
        console.info('Bingo game complete! All 75 numbers have been called.')
        return
      }

      const randomIndex = Math.floor(Math.random() * remaining.length)
      const nextNumber = remaining[randomIndex]

      if (this.currentNumber !== null) {
        this.setPreviousNumber(this.currentNumber)
      }

      if (!nextNumber) {
        console.error('No next number found!')
        return
      }

      this.setCurrentNumber(nextNumber)
      this.calledNumbers.push(nextNumber)
    },
    resetGame() {
      this.currentNumber = null
      this.previousNumber = null
      this.calledNumbers = []
    },
    setCurrentNumber(number: number) {
      this.currentNumber = number
    },
    setPreviousNumber(number: number) {
      this.previousNumber = number
    },
  },
})
