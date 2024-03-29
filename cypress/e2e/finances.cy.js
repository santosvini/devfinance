/// <reference types="Cypress" />

describe("Testes e2e da DevFinance$", () => {
  
  beforeEach(() => {
    cy.step('Open a page')
    cy.visit("/index.html");
    cy.title("Dev.Finance$");
  });

  context("Validação de elemento ", () => {
    it("Valida a imagem da DevFinance$", () => {
      cy.step('Valida a logo da página')
      cy.get('img[alt="Logo Dev Finance"]')
        .should("be.visible");
    });
  });

  context("Valida os campos da modal de Nova Transação", () => {
    it("Não deve permitir nova transação sem os campos preenchidos", () => {
      cy.alert()

      cy.step('Salva a transação')
      cy.get("button")
        .should("be.visible")
        .contains("Salvar")
        .click();
    });

    it("Não deve permitir uma nova transação só com o campo descrição preenchido", () => {
      cy.alert()

      cy.step('Preenche com uma nova transação somente com o campo descrição')
      cy.get("#description")
        .should("be.visible")
        .type("Fazer mercado");

      cy.step('Salva a transação')
      cy.get("button")
        .should("be.visible")
        .contains("Salvar")
        .click();
    });

    it("Não deve permitir uma nova transação só com o campo valor preenchido", () => {
      cy.alert()

      cy.step('Preenche a transação somente com o campo valor')
      cy.get("#amount")
        .should('be.visible')
        .type(500)
      
      cy.step('Salva a transação')
      cy.get("button")
        .should("be.visible")
        .contains("Salvar")
        .click();
    });

    it('Não deve permitir uma nova transação só com o campo data preenchido', () => {
      cy.alert()

      cy.step('Preenche a transação somente com o campo data')
      cy.get('#date')
        .should('be.visible')
        .type('2023-03-04')
      
      cy.step('Salva a transação')
      cy.get("button")
        .should("be.visible")
        .contains("Salvar")
        .click();
    });
  });

  context("Entrada", () => {
    it("Fazer uma transação de entrada", () => {
      cy.step('Nova transação')
      cy.criarTransacao("Criação de site", 1200);
      
      cy.step('Verifica se a transação está cadastrada')
      cy.get("tbody td.description")
        .should("be.visible")
        .should("have.text", "Criação de site");
    });
    
    it("Verifica o valor de entrada", () => {
      cy.step('Nova transação')
      cy.criarTransacao("Prestação Apto", 1250);

      cy.step('Verifica se o valor da transação está cadastrada')
      cy.get("#incomeDisplay")
        .contains("R$ 1.250,00")
        .should("be.visible");

      cy.step('Transação esteja visível')
      cy.get("tbody td.description")
        .should("be.visible")
        .should("have.text", "Prestação Apto");
    });
  });

  context("Saída", () => {
    it("Fazer uma transação de uma saída", () => {
      cy.step('Nova transação negativa')
      cy.criarTransacao("Cinema", -30);

      cy.step('Verifica se a transação está cadastrada')
      cy.get("tbody td.description")
        .should("be.visible")
        .should("have.text", "Cinema");
    });

    it("Verifica o valor de uma saída", () => {
      cy.step('Nova transação negativa')
      cy.criarTransacao("Inglês", -350);

      cy.step('Verifica se o valor da transação está cadastrada')
      cy.get("#expenseDisplay")
        .contains("-R$ 350,00")
        .should("be.visible");

      cy.step('Transação esteja visível')
      cy.get("tbody td.description")
        .should("be.visible")
        .should("have.text", "Inglês");
    });
  });

  context('Total',  () => {
    it('Verifica o total com um valor positivo ', () => {
      
      cy.criarTransacao("Venda de livros", 100);
      cy.criarTransacao("Cinema", -30);

      cy.step('Verifica se está visível na tabela')
      cy.get('#data-table')
        .should('be.visible')

      cy.step('Verifica o valor positivo')
      cy.get('.income')
        .contains('R$ 100,00')
        .should('be.visible')
      
      cy.step('Verifica o valor negativo')
      cy.get('.expense')
        .contains('-R$ 30,00')
        .should('be.visible')

      cy.step('Verifica o valor total seja positivo')
      cy.get('.total')
        .should("be.visible")
        .contains('R$ 70,00')
    });

    it('Verifica o total com um valor negativo ', () => {
      cy.criarTransacao("Venda de livros", 100);
      cy.criarTransacao("Mercado", -300);

      cy.step('Verifica se está visível na tabela')
      cy.get('#data-table')
        .should('be.visible')

      cy.step('Verifica o valor positivo')
      cy.get('.income')
        .contains('R$ 100,00')
        .should('be.visible')
      
      cy.step('Verifica o valor negativo')
      cy.get('.expense')
        .contains('-R$ 300,00')
        .should('be.visible')

      cy.step('Verifica o valor total seja negativo')
      cy.get('.total')
        .should("be.visible")
        .contains('-R$ 200,00')
    });
   
    it('Verifica o total com um valor zerado ', () => {
      cy.criarTransacao("Venda de livros", 100);
      cy.criarTransacao("Dentista", -100);

      cy.step('Verifica se está visível na tabela')
      cy.get('#data-table')
        .should('be.visible')

      cy.step('Verifica o valor positivo')
      cy.get('.income')
        .contains('R$ 100,00')
        .should('be.visible')
      
      cy.step('Verifica o valor negativo')
      cy.get('.expense')
        .contains('-R$ 100,00')
        .should('be.visible')

      cy.step('Verifica o valor total seja zerado')
      cy.get('.total')
        .should("be.visible")
        .contains('R$ 0,00')
    });
  })

  context("Exclusão", () => {
    it("Fazer a exclusão de uma transação de entrada", () => {
      cy.criarTransacao("Criação de site", 1200);

      cy.step('Verifica se o transação esteja visível')
      cy.contains(".description", "Criação de site")
        .parent()
        .find("img")
        .should("be.visible")
        .click();

      cy.step('Verifica a entrada')
      cy.get("#balance h3")
        .contains("Entradas")
        .should("be.visible")
      
      cy.step('Verifica o valor da entrada')
      cy.get("#incomeDisplay")
        .should("contain", "0,00")

      cy.get("tbody tr")
        .should("have.length", 0);
    });

    it('Fazer a exclusão de uma transação de saída', () => {
      cy.criarTransacao("Inglês", -350);

      cy.step('Verifica se o transação esteja visível')
      cy.contains(".description", "Inglês")
        .parent()
        .find("img")
        .should("be.visible")
        .click();
      
      cy.step('Verifica a saída')
      cy.get("#balance h3")
        .contains("Saídas")
        .should("be.visible")
      
      cy.step('Verifica o valor da entrada')
      cy.get("#expenseDisplay")
        .should("contain", "0,00")

      cy.get("tbody tr")
        .should("have.length", 0);
    });
  });

  context('Rodapé', () => {
    it('Valida o footer da DevFinance$', () => {

      const text = "Dev.Finance$ by Vini Santos"

      cy.step('Valida o texto do footer da DevFinance')
      cy.get('footer > p')
        .should("have.text", text)
        .should("be.visible")
    }); 
  });
});

