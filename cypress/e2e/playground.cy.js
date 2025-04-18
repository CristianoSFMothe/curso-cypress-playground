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

  it('selects a type via the dropdown field and asserts on the selection', () => {
    cy.contains('p', "You haven't selected a type yet.").should('be.visible')

    cy.get('#selection-type').select('VIP')

    cy.contains('p', "You've selected: VIP").should('be.visible')
  });

  it('selects multiple fruits via the dropdown field and asserts on the selection', () => {
    cy.contains('p', "You haven't selected any fruit yet.").should('be.visible')

    cy.get('#fruit').select(['apple', 'banana', 'cherry'])

    cy.contains('p', "You've selected the following fruits: apple, banana, cherry")
      .should('be.visible')
  });

  it('uploads a file and asserts the correct file name appears as paragraph', () => {
    cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json')

    cy.contains('p', 'The following file has been selected for upload: example.json')
      .should('be.visible')

  });

  it('click a button and triggers a reques', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1')
      .as('getTodo')

    cy.contains('button', 'Get TODO').click()
    cy.wait('@getTodo')
      .its('response.statusCode')
      .should('be.equal', 200)

    cy.contains('li', 'TODO ID: 1').should('be.visible')
    cy.contains('li', 'Title: delectus aut autem').should('be.visible')
    cy.contains('li', 'Completed: false').should('be.visible')
    cy.contains('li', 'User ID: 1').should('be.visible')
  });

  it.only('clicks a button and trigger a stubbier request', () => {
    const todo = require('../fixtures/todo')

    cy.intercept(
      'GET',
      'https://jsonplaceholder.typicode.com/todos/1',
      { fixture: 'todo' }
    ).as('getTodo')

    cy.contains('button', 'Get TODO').click()

    cy.wait('@getTodo')
      .its('response.statusCode')
      .should('be.equal', 200)

    cy.contains('li', `TODO ID: ${todo.id}`).should('be.visible')
    cy.contains('li', `Title: ${todo.title}`).should('be.visible')
    cy.contains('li', `Completed: ${todo.completed}`).should('be.visible')
    cy.contains('li', `User ID: ${todo.userId}`).should('be.visible')
  });



})