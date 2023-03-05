/// <reference types="Cypress" />

describe("Testes e2e da DevFinance$", () => {
  
  beforeEach(() => {
    cy.visit("/index.html");
    cy.title("Dev.Finance$");
  });

  context("Validação de elemento ", () => {
    it("Valida a imagem da DevFinance$", () => {
      cy.get('img[alt="Logo Dev Finance"]')
        .should("be.visible");
    });
  });

  context("Valida os campos da modal de Nova Transação", () => {
    it("Não deve permitir nova transação sem os campos preenchidos", () => {
      cy.alert()

      cy.get("button")
        .should("be.visible")
        .contains("Salvar")
        .click();
    });

    it("Não deve permitir uma nova transação só com o campo descrição preenchido", () => {
      cy.alert()

      cy.get("#description")
        .should("be.visible")
        .type("Fazer mercado");

      cy.get("button")
        .should("be.visible")
        .contains("Salvar")
        .click();
    });

    it("Não deve permitir uma nova transação só com o campo valor preenchido", () => {
      
      cy.alert()

      cy.get("#amount")
        .should('be.visible')
        .type(500)
      
      cy.get("button")
        .should("be.visible")
        .contains("Salvar")
        .click();
    });

    it('Não deve permitir uma nova transação só com o campo data preenchido', () => {
      cy.alert()

      cy.get('#date')
        .should('be.visible')
        .type('2023-03-04')
      
      cy.get("button")
        .should("be.visible")
        .contains("Salvar")
        .click();
    });
  });

  context("Entrada", () => {
    it("Fazer uma transação de entrada", () => {
      cy.criarTransacao("Criação de site", 1200);

      cy.get("tbody td.description")
        .should("be.visible")
        .should("have.text", "Criação de site");
    });

    it("Verifica o valor de entrada", () => {
      cy.criarTransacao("Prestação Apto", 1250);

      cy.get("#incomeDisplay")
        .contains("R$ 1.250,00")
        .should("be.visible");

      cy.get("tbody td.description")
        .should("be.visible")
        .should("have.text", "Prestação Apto");
    });
  });

  context("Saída", () => {
    it("Fazer uma transação de uma saída", () => {
      cy.criarTransacao("Cinema", -30);

      cy.get("tbody td.description")
        .should("be.visible")
        .should("have.text", "Cinema");
    });

    it("Verifica o valor de uma saída", () => {
      cy.criarTransacao("Inglês", -350);

      cy.get("#expenseDisplay")
        .contains("-R$ 350,00")
        .should("be.visible");

      cy.get("tbody td.description")
        .should("be.visible")
        .should("have.text", "Inglês");
    });
  });

  context('Total',  () => {
    it('Verifica o total com um valor positivo ', () => {
      
      cy.criarTransacao("Venda de livros", 100);
      cy.criarTransacao("Cinema", -30);

      cy.get('#data-table')
        .should('be.visible')

      cy.get('.income')
        .contains('R$ 100,00')
        .should('be.visible')
      
      cy.get('.expense')
        .contains('-R$ 30,00')
        .should('be.visible')

      cy.get('.total')
        .should("be.visible")
        .contains('R$ 70,00')
    });

    it('Verifica o total com um valor negativo ', () => {
      cy.criarTransacao("Venda de livros", 100);
      cy.criarTransacao("Mercado", -300);

      cy.get('#data-table')
        .should('be.visible')

      cy.get('.income')
        .contains('R$ 100,00')
        .should('be.visible')
      
      cy.get('.expense')
        .contains('-R$ 300,00')
        .should('be.visible')

      cy.get('.total')
        .should("be.visible")
        .contains('-R$ 200,00')
    });
   
    it('Verifica o total com um valor zerado ', () => {
      cy.criarTransacao("Venda de livros", 100);
      cy.criarTransacao("Dentista", -100);

      cy.get('#data-table')
        .should('be.visible')

      cy.get('.income')
        .contains('R$ 100,00')
        .should('be.visible')
      
      cy.get('.expense')
        .contains('-R$ 100,00')
        .should('be.visible')

      cy.get('.total')
        .should("be.visible")
        .contains('R$ 0,00')
    });
  })

  context("Exclusão", () => {
    it("Fazer a exclusão de uma transação de entrada", () => {
      cy.criarTransacao("Criação de site", 1200);

      cy.contains(".description", "Criação de site")
        .parent()
        .find("img")
        .should("be.visible")
        .click();

      cy.get("#balance h3")
        .contains("Entradas")
        .should("be.visible")
      
      cy.get("#incomeDisplay")
        .should("contain", "0,00")

      cy.get("tbody tr")
        .should("have.length", 0);
    });

    it('Fazer a exclusão de uma transação de saída', () => {
      cy.criarTransacao("Inglês", -350);

      cy.contains(".description", "Inglês")
        .parent()
        .find("img")
        .should("be.visible")
        .click();
      
      cy.get("#balance h3")
        .contains("Saídas")
        .should("be.visible")
      
      cy.get("#expenseDisplay")
        .should("contain", "0,00")

      cy.get("tbody tr")
        .should("have.length", 0);
    });
  });

  context('Rodapé', () => {
    it('Valida o footer da DevFinance$', () => {

      const text = "Dev.Finance$ by Vini Santos"

      cy.get('footer > p')
        .should("have.text", text)
        .should("be.visible")
    });
  });
});
