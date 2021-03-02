const Modal = {
  open() {
    // Abrir modal
    // Add a class active ao modal
    document
        .querySelector(".modal-overlay")
        .classList
        .add("active");
  },
  close() {
    // Fechar o modal
    // Remover a class active do modal
    document
        .querySelector(".modal-overlay")
        .classList
        .remove("active");
  }
}

const Transaction = {
  all: [
    {
      description: "Luz",
      amount: -50001,
      date: "23/01/2021",
    },
    {
      description: "Website",
      amount: 500000,
      date: "23/01/2021",
    },
    {
      description: "Internet",
      amount: -20012,
      date: "23/01/2021",
    },
    {
      description: "App",
      amount: 200000,
      date: "23/01/2021",
    },
  ],

  add(transaction) {
      Transaction.all.push(transaction)

      App.reload()
  },

  remove(index) {
      Transaction.all.splice(index, 1)

      App.reload()

  },

  incomes() {
    let income = 0;
    // pegar todas as transações
    // para cada transação
    Transaction.all.forEach(transaction => {
      //se for maior que zero
      if (transaction.amount > 0) {
        //somar a uma variável e retornar a variável 
        income += transaction.amount;
      }
    })
      return income;
  },

  expenses() {
    let expense = 0;
    // pegar todas as transações
    // para cada transação
    Transaction.all.forEach(transaction => {
      //se for menor que zero
      if (transaction.amount < 0) {
        //somar a uma variável e retornar a variável 
        expense += transaction.amount;
      }
    })
      return expense;
  },

  total() {
      return Transaction.incomes() + Transaction.expenses();
  }
}

//Substituir os dados do HTML com os dados do JS
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    
    addTransaction(transaction, index) {
      const tr = document.createElement('tr')
      tr.innerHTML = DOM.innerHTMLTransaction(transaction)

      DOM.transactionsContainer.appendChild(tr)

    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg"
                alt="Remove transactions">
            </td>
            `

            return html
    },

    updateBalance() {
      document
          .getElementById('incomeDisplay')
          .innerHTML = Utils.formatCurrency(Transaction.incomes())
      document
          .getElementById('expenseDisplay')
          .innerHTML = Utils.formatCurrency(Transaction.expenses())
      document
          .getElementById('totalDisplay')
          .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTrasactions() {
      DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "")

    value = Number(value) / 100

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return (signal + value)
  }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
    validateFields() {
        const {description, amount, date} = Form.getValues()
        console.log(description)
    },

    submit(event) {
        event.preventDefault()

      // Verificar se todas as informações foram preenchidas
        Form.validateFields()

      // Formatar os dados para salvar
      // Form.formatData()
      // Salvar
      // Apagar os dados do formulário
      // Fechar a Modal
      // Atualizar a aplicação
    }
}

const App = {
    init() {

      Transaction.all.forEach(transaction => {
        DOM.addTransaction(transaction)
      })
      
      DOM.updateBalance()

    },
    reload() {
      DOM.clearTrasactions()
      App.init()
    },
}

App.init()