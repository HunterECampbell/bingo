describe('Bingo Game E2E Tests', () => {
  beforeEach(() => {
    // Set viewport to phone size (iPhone 12/13/14 dimensions)
    cy.viewport(390, 844)
    cy.visit('/')
  })

  describe('Initial State', () => {
    it('should display the bingo interface correctly', () => {
      cy.get('#bingo-wrapper').should('be.visible')
      cy.get('.bingo-letter-column').should('have.length', 5)
      cy.get('.column-header').should('contain', 'B')
      cy.get('.column-header').should('contain', 'I')
      cy.get('.column-header').should('contain', 'N')
      cy.get('.column-header').should('contain', 'G')
      cy.get('.column-header').should('contain', 'O')
      cy.get('#next-number-btn').should('be.visible').should('contain', 'Next Number')
      cy.get('#current-number').should('exist')
      cy.get('#previous-number').should('exist')
    })

    it('should have correct number ranges in each column', () => {
      cy.get('.bingo-letter-column')
        .first()
        .within(() => {
          cy.get('.number-text').should('contain', '1')
          cy.get('.number-text').should('contain', '15')
          cy.get('.number-text').should('not.contain', '16')
        })

      cy.get('.bingo-letter-column')
        .last()
        .within(() => {
          cy.get('.number-text').should('contain', '61')
          cy.get('.number-text').should('contain', '75')
          cy.get('.number-text').should('not.contain', '60')
        })
    })

    it('should have glassmorphism styling applied', () => {
      cy.get('#bingo-wrapper').should('have.css', 'backdrop-filter')
      cy.get('#bingo-wrapper').should('have.css', 'background-color')
      cy.get('#bingo-wrapper').should('have.css', 'border-radius')
    })
  })

  describe('Game Functionality', () => {
    it('should call the first number when next number button is clicked', () => {
      cy.get('#next-number-btn').click()
      cy.get('#current-number p').should('not.be.empty')
      cy.get('.called-number').should('have.length', 1)
      cy.get('#current-number p')
        .invoke('text')
        .then((text) => {
          const number = parseInt(text)
          expect(number).to.be.at.least(1)
          expect(number).to.be.at.most(75)
        })
    })

    it('should move current number to previous when next number is called', () => {
      cy.get('#next-number-btn').click()
      cy.get('#current-number').should('not.have.class', 'transparent')
      cy.get('#current-number p').invoke('text').as('firstNumber')

      cy.get('#previous-number').should('have.class', 'transparent')

      cy.get('#next-number-btn').click()
      cy.get('#previous-number').should('not.have.class', 'transparent')
      cy.get('#current-number p').invoke('text').as('secondNumber')

      cy.get('#previous-number').should('not.have.class', 'transparent')

      cy.get('@firstNumber').then((firstNumber) => {
        cy.get('#previous-number p').should('have.text', String(firstNumber))
      })

      cy.get('@secondNumber').then((secondNumber) => {
        cy.get('#current-number p').invoke('text').should('have.text', String(secondNumber))
      })

      cy.get('.called-number').should('have.length', 2)
    })

    it('should not call duplicate numbers', () => {
      const calledNumbers: number[] = []
      for (let i = 0; i < 10; i++) {
        cy.get('#next-number-btn').click()
        cy.get('#current-number p')
          .invoke('text')
          .then((text) => {
            const number = parseInt(text)
            expect(calledNumbers).to.not.include(number)
            calledNumbers.push(number)
          })
      }
      cy.get('.called-number').should('have.length', 10)
    })

    it('should highlight called numbers with pine tree green styling', () => {
      cy.get('#next-number-btn').click()
      cy.get('.called-number')
        .should('have.css', 'background-color')
        .and('include', 'rgba(29, 87, 64, 0.8)')
      cy.get('#current-number')
        .should('have.css', 'background-color')
        .and('include', 'rgba(29, 87, 64, 0.8)')
    })

    it('should track progress correctly', () => {
      for (let i = 0; i < 5; i++) {
        cy.get('#next-number-btn').click()
      }
      cy.get('.called-number').should('have.length', 5)
      cy.get('#current-number p').should('not.be.empty')
      cy.get('#previous-number p').should('not.be.empty')
    })
  })

  describe('User Interface Behavior', () => {
    it('should have responsive number displays', () => {
      cy.get('#next-number-btn').click()
      cy.get('#next-number-btn').click()
      cy.get('#current-number p').should('have.css', 'font-size')
      cy.get('#previous-number p').should('have.css', 'font-size')
      cy.get('#current-number').should('be.visible')
      cy.get('#previous-number').should('be.visible')
    })

    it('should handle transparency classes correctly', () => {
      cy.get('#current-number').should('have.class', 'transparent')
      cy.get('#previous-number').should('have.class', 'transparent')
      cy.get('#next-number-btn').click()
      cy.get('#current-number').should('not.have.class', 'transparent')
      cy.get('#previous-number').should('have.class', 'transparent')
      cy.get('#next-number-btn').click()
      cy.get('#current-number').should('not.have.class', 'transparent')
      cy.get('#previous-number').should('not.have.class', 'transparent')
    })

    it('should maintain glassmorphism effects throughout the game', () => {
      for (let i = 0; i < 3; i++) {
        cy.get('#next-number-btn').click()
      }
      cy.get('#bingo-wrapper').should('have.css', 'backdrop-filter')
      cy.get('.number-wrapper').should('have.css', 'backdrop-filter')
      cy.get('#next-number-btn').should('have.css', 'backdrop-filter')
    })
  })

  describe('Accessibility and Performance', () => {
    it('should be accessible with proper semantic elements', () => {
      cy.get('main').should('exist')
      cy.get('button').should('be.visible')
      cy.get('h2').should('have.length', 5)
      cy.get('#next-number-btn').should('not.be.empty')
    })

    it('should handle rapid clicking without breaking', () => {
      for (let i = 0; i < 5; i++) {
        cy.get('#next-number-btn').click()
      }
      cy.get('.called-number').should('have.length', 5)
      cy.get('#current-number p')
        .invoke('text')
        .then((text) => {
          const number = parseInt(text)
          expect(number).to.be.at.least(1)
          expect(number).to.be.at.most(75)
        })
    })

    it('should maintain consistent state throughout the session', () => {
      const calledCount = 7
      for (let i = 0; i < calledCount; i++) {
        cy.get('#next-number-btn').click()
      }
      cy.get('.called-number').should('have.length', calledCount)
      cy.get('#current-number p').should('not.be.empty')
      cy.get('#previous-number p').should('not.be.empty')
      cy.get('.called-number').each(($el) => {
        cy.wrap($el).should('have.css', 'background-color')
      })
    })
  })
})
