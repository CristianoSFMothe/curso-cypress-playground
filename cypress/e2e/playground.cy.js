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

  it('check both possible radios and asserts if it is "on" or "off"', () => {
    cy.contains('#on-off', 'ON').should('be.visible')

    cy.get('input[type="radio"][value="off"]').check()
    cy.contains('#on-off', 'OFF').should('be.visible')
    cy.contains('#on-off', 'ON').should('not.exist')

    cy.get('input[type="radio"][value="on"]').check()
    cy.contains('#on-off', 'ON').should('be.visible')
    cy.contains('#on-off', 'OFF').should('not.exist')
  });

  it.only('selects a type via the dropdown field and asserts on the selection', () => {
    cy.contains('p', "You haven't selected a type yet.").should('be.visible')

    cy.get('#selection-type').select('VIP')

    cy.contains('p', "You've selected: VIP").should('be.visible')
  });

})