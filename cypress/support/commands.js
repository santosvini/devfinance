// ***********************************************
// This example commands.js shows you how to
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
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('criarTransacao', (descricao, valor) => {
  cy.step('Cria uma transacao')
  cy.contains('Nova Transação')
    .should('be.visible')
    .click()
      
  cy.step('Descriçao de entrada')
  cy.get('#description')
    .should('be.visible')
    .type(descricao)

  cy.step('Entra com o valor')
  cy.get('#amount')
    .should('be.visible')
    .type(valor)

  cy.step('Data da transação')
  cy.get('#date')
    .should('be.visible')
    .type("2023-02-25")

  cy.step('Salva a transação')
  cy.get('button')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('alert', () => {
  const stub = cy.stub();

  cy.on("window:alert", stub);

  cy.step('Cria a nova transação')
  cy.contains("Nova Transação")
    .should("be.visible")
    .click();
})
