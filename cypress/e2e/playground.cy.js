describe('Cypress Playground', () => {

  beforeEach(() => {
    cy.visit('https://cypress-playground.s3.eu-central-1.amazonaws.com/index.html')
  });

  it('shows a promotional banner', () => {
    cy.get('#promotional-banner').should('be.visible')
  })

  it('clicks the Subscribe button and show a success message', () => {
    cy.contains('button', 'Subscribe').should('be.visible').click()

    cy.contains('#success', "You've been successfully subscribed to our newsletter.")
      .should('be.visible')
  });

  it('types in an input which "signs" a form, the asserts it is signed', () => {
    cy.get('#signature-textarea').should('be.visible').type('Cristiano')

    cy.contains('#signature', 'Cristiano').should('be.visible')
  });

  it('types in the signature field, checks the checkbox to see preview, then unchecks it', () => {
    cy.get('#signature-textarea-with-checkbox').type('Cristiano')
    cy.get('#signature-checkbox').check()

    cy.contains('#signature-triggered-by-check', 'Cristiano').should('be.visible')

    cy.get('#signature-checkbox').uncheck()
    cy.contains('#signature-triggered-by-check', 'Cristiano').should('not.exist')
  });


})