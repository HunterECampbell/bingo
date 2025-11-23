import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBingoStore } from '../bingo'
import { BingoLetter } from '@/types/bingo-types'

describe('useBingoStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const store = useBingoStore()

      expect(store.calledNumbers).toEqual([])
      expect(store.currentNumber).toBeNull()
      expect(store.previousNumber).toBeNull()
    })
  })

  describe('Getters', () => {
    describe('gameComplete', () => {
      it('should return false when no numbers are called', () => {
        const store = useBingoStore()
        expect(store.gameComplete).toBe(false)
      })

      it('should return false when some numbers are called', () => {
        const store = useBingoStore()
        store.calledNumbers = [1, 2, 3, 4, 5]
        expect(store.gameComplete).toBe(false)
      })

      it('should return true when all 75 numbers are called', () => {
        const store = useBingoStore()
        store.calledNumbers = Array.from({ length: 75 }, (_, i) => i + 1)
        expect(store.gameComplete).toBe(true)
      })
    })

    describe('numberRange', () => {
      it('should return correct number ranges for each letter', () => {
        const store = useBingoStore()
        const ranges = store.numberRange

        expect(ranges[BingoLetter.B]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
        expect(ranges[BingoLetter.I]).toEqual([
          16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ])
        expect(ranges[BingoLetter.N]).toEqual([
          31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
        ])
        expect(ranges[BingoLetter.G]).toEqual([
          46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
        ])
        expect(ranges[BingoLetter.O]).toEqual([
          61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
        ])
      })

      it('should have exactly 15 numbers in each range', () => {
        const store = useBingoStore()
        const ranges = store.numberRange

        Object.values(BingoLetter).forEach((letter) => {
          expect(ranges[letter]).toHaveLength(15)
        })
      })
    })

    describe('remainingNumbers', () => {
      it('should return all numbers 1-75 when no numbers are called', () => {
        const store = useBingoStore()
        expect(store.remainingNumbers).toHaveLength(75)
        expect(store.remainingNumbers).toEqual(Array.from({ length: 75 }, (_, i) => i + 1))
      })

      it('should exclude called numbers from remaining numbers', () => {
        const store = useBingoStore()
        store.calledNumbers = [1, 5, 10, 25, 50, 75]

        const remaining = store.remainingNumbers
        expect(remaining).toHaveLength(69)
        expect(remaining).not.toContain(1)
        expect(remaining).not.toContain(5)
        expect(remaining).not.toContain(10)
        expect(remaining).not.toContain(25)
        expect(remaining).not.toContain(50)
        expect(remaining).not.toContain(75)
      })

      it('should return empty array when all numbers are called', () => {
        const store = useBingoStore()
        store.calledNumbers = Array.from({ length: 75 }, (_, i) => i + 1)
        expect(store.remainingNumbers).toHaveLength(0)
      })
    })
  })

  describe('Actions', () => {
    describe('setCurrentNumber', () => {
      it('should set the current number', () => {
        const store = useBingoStore()
        store.setCurrentNumber(42)
        expect(store.currentNumber).toBe(42)
      })
    })

    describe('setPreviousNumber', () => {
      it('should set the previous number', () => {
        const store = useBingoStore()
        store.setPreviousNumber(33)
        expect(store.previousNumber).toBe(33)
      })
    })

    describe('resetGame', () => {
      it('should reset all game state', () => {
        const store = useBingoStore()

        // Set some state
        store.currentNumber = 42
        store.previousNumber = 33
        store.calledNumbers = [1, 2, 3, 4, 5]

        // Reset the game
        store.resetGame()

        // Check that everything is reset
        expect(store.currentNumber).toBeNull()
        expect(store.previousNumber).toBeNull()
        expect(store.calledNumbers).toEqual([])
        expect(store.gameComplete).toBe(false)
      })
    })

    describe('getNextNumber', () => {
      beforeEach(() => {
        // Mock Math.random to make tests deterministic
        vi.spyOn(Math, 'random').mockReturnValue(0.5)
      })

      it('should set a number when none has been called', () => {
        const store = useBingoStore()
        const initialRemainingCount = store.remainingNumbers.length

        store.getNextNumber()

        expect(store.currentNumber).toBeGreaterThanOrEqual(1)
        expect(store.currentNumber).toBeLessThanOrEqual(75)
        expect(store.calledNumbers).toHaveLength(1)
        expect(store.calledNumbers).toContain(store.currentNumber)
        expect(store.remainingNumbers).toHaveLength(initialRemainingCount - 1)
      })

      it('should move current number to previous when calling next number', () => {
        const store = useBingoStore()

        store.getNextNumber()
        const firstNumber = store.currentNumber

        store.getNextNumber()

        expect(store.previousNumber).toBe(firstNumber)
        expect(store.currentNumber).not.toBe(firstNumber)
        expect(store.calledNumbers).toHaveLength(2)
      })

      it('should not call the same number twice', () => {
        const store = useBingoStore()
        const calledNumbers = new Set()

        // Call numbers multiple times
        for (let i = 0; i < 10; i++) {
          store.getNextNumber()
          if (store.currentNumber) {
            expect(calledNumbers.has(store.currentNumber)).toBe(false)
            calledNumbers.add(store.currentNumber)
          }
        }

        expect(store.calledNumbers).toHaveLength(10)
        expect(new Set(store.calledNumbers).size).toBe(10) // All unique
      })

      it('should warn and return early when game is complete', () => {
        const store = useBingoStore()
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

        // Play a complete game naturally, then try to call another number
        while (!store.gameComplete) {
          store.getNextNumber()
        }

        // Now try to call getNextNumber() when game is already complete
        store.getNextNumber()

        expect(consoleSpy).toHaveBeenCalledWith('All bingo numbers have been called!')
        expect(store.calledNumbers).toHaveLength(75)

        consoleSpy.mockRestore()
      })

      it('should call all numbers from 1 to 75 eventually', () => {
        const store = useBingoStore()

        // Call getNextNumber until game is complete
        while (!store.gameComplete) {
          store.getNextNumber()
        }

        expect(store.calledNumbers).toHaveLength(75)
        expect(store.gameComplete).toBe(true)

        // Check that all numbers 1-75 are present
        const sortedCalled = [...store.calledNumbers].sort((a, b) => a - b)
        const expectedNumbers = Array.from({ length: 75 }, (_, i) => i + 1)
        expect(sortedCalled).toEqual(expectedNumbers)
      })

      it('should only call numbers within bingo range (1-75)', () => {
        const store = useBingoStore()

        // Call several numbers
        for (let i = 0; i < 20; i++) {
          store.getNextNumber()
        }

        store.calledNumbers.forEach((number) => {
          expect(number).toBeGreaterThanOrEqual(1)
          expect(number).toBeLessThanOrEqual(75)
          expect(Number.isInteger(number)).toBe(true)
        })
      })
    })
  })

  describe('Integration Tests', () => {
    it('should play a complete bingo game', () => {
      const store = useBingoStore()

      expect(store.gameComplete).toBe(false)
      expect(store.calledNumbers).toHaveLength(0)

      // Play the entire game
      let iterationCount = 0
      const maxIterations = 100 // Safety net

      while (!store.gameComplete && iterationCount < maxIterations) {
        const beforeCount = store.calledNumbers.length
        store.getNextNumber()
        expect(store.calledNumbers.length).toBe(beforeCount + 1)
        iterationCount++
      }

      expect(store.gameComplete).toBe(true)
      expect(store.calledNumbers).toHaveLength(75)
      expect(store.remainingNumbers).toHaveLength(0)
    })

    it('should maintain proper state through reset cycles', () => {
      const store = useBingoStore()

      // Play partially
      for (let i = 0; i < 10; i++) {
        store.getNextNumber()
      }

      expect(store.calledNumbers).toHaveLength(10)
      expect(store.currentNumber).not.toBeNull()

      // Reset and verify
      store.resetGame()

      expect(store.calledNumbers).toHaveLength(0)
      expect(store.currentNumber).toBeNull()
      expect(store.previousNumber).toBeNull()
      expect(store.gameComplete).toBe(false)
      expect(store.remainingNumbers).toHaveLength(75)

      // Should be able to play again
      store.getNextNumber()
      expect(store.calledNumbers).toHaveLength(1)
      expect(store.currentNumber).not.toBeNull()
    })
  })
})
