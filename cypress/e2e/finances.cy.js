/// <reference types="Cypress" />

describe('Testes e2e da DevFinance$', () => {

  beforeEach(() => {
    cy.visit('/index.html')
    cy.title('Dev.Finance$')
  })

  context('Validação de elemento ', () => {
    it('Valida a imagem da DevFinance$', () => {
      cy.get('img[alt="Logo Dev Finance"]')
        .should('be.visible')
    })
  })

  context.only('Valida os campos de Nova Transação', () => {
    it('', () => {
      
    });
  });

  context('Entrada', () => {
    it('Fazer uma transação de entrada', () => {
      
      cy.criarTransacao('Criação de site', 1200)

      cy.get('tbody td.description')
        .should("be.visible")
        .should("have.text", "Criação de site")
    })

    it('Verifica o valor de entrada', () => {

      cy.criarTransacao('Prestação Apto', 1250)

      cy.get('#incomeDisplay')
      .contains('R$ 1.250,00')
      .should('be.visible')

      cy.get('tbody td.description')
        .should("be.visible")
        .should("have.text", "Prestação Apto")
      
    });
  })

  context('Saída', () => {
    it('Fazer uma transação de saída', () => {

      cy.criarTransacao('Cinema', -30)

      cy.get('tbody td.description')
        .should("be.visible")
        .should("have.text", "Cinema")
      
    })

    it('Verifica o valor de saída', () => {

      cy.criarTransacao('Inglês', -350)

      cy.get('#expenseDisplay')
      .contains('-R$ 350,00')
      .should('be.visible')

      cy.get('tbody td.description')
        .should("be.visible")
        .should("have.text", "Inglês")
      
    });
  })

  context('Exclusão', () => {
    it('Fazer a exclusão de uma transação', () => {

      cy.criarTransacao('Criação de site', 1200)

      cy.contains(".description", 'Criação de site')
        .parent()
        .find('img')
        .should('be.visible')
        .click()

      cy.get("tbody tr")
        .should('have.length', 0)
    })
  })
})