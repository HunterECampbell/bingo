/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// Custom Bingo Game Commands
Cypress.Commands.add('callBingoNumbers', (count: number) => {
  for (let i = 0; i < count; i++) {
    cy.get('#next-number-btn').click()
    cy.wait(50) // Small delay to ensure state updates
  }
})

Cypress.Commands.add('getBingoStore', () => {
  return cy.window().its('app.config.globalProperties.$pinia._s').its('Map').invoke('get', 'bingo')
})

Cypress.Commands.add('resetBingoGame', () => {
  cy.getBingoStore().invoke('resetGame')
})

Cypress.Commands.add('simulateCompleteGame', () => {
  cy.getBingoStore().then((store) => {
    const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1)
    store.calledNumbers = allNumbers
  })
})

Cypress.Commands.add('verifyNumberInRange', (selector: string, min: number, max: number) => {
  cy.get(selector).invoke('text').then((text) => {
    const number = parseInt(text.trim())
    expect(number).to.be.at.least(min)
    expect(number).to.be.at.most(max)
  })
})

declare global {
  namespace Cypress {
    interface Chainable {
      callBingoNumbers(count: number): Chainable<void>
      getBingoStore(): Chainable<any>
      resetBingoGame(): Chainable<void>
      simulateCompleteGame(): Chainable<void>
      verifyNumberInRange(selector: string, min: number, max: number): Chainable<void>
    }
  }
}

export {}
