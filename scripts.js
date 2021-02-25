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

const transactions = [
  {
    id: 1,
    description: "Luz",
    amount: -50000,
    date: "23/01/2021",
  },
  {
    id: 2,
    description: "Website",
    amount: -500000,
    date: "23/01/2021",
  },
  {
    id: 1,
    description: "Internet",
    amount: -20000,
    date: "23/01/2021",
  },
]

const Transaction = {
  incomes() {
    //Somar as entradas
  },
  expenses() {
    //Somar as saídas
  },
  total() {
    // entradas - saídas
  },
}

//Substituir os dados do HTML com os dados do JS

const DOM = {
    
    innerHTMLTransaction() {

        const html = `
        <tr>
            <td class="description">Luz</td>
            <td class="expense">- R$ 500,00</td>
            <td class="date">23/01/2021</td>
            <td>
                <img src="./assets/minus.svg"
                alt="Remove transactions">
            </td>
      </tr>
      `
    }
}