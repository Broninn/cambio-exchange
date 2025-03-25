//cotação da moeda do dia
const USD = 4.87;
const EUR = 5.32;
const GBP = 6.08;

//obter elementos do formulario
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

//manipulando o input amount para receber somente número
amount.addEventListener("input", () => {
  const hasChractersRegex = /\D+/g;
  amount.value = amount.value.replace(hasChractersRegex, "");
});

form.onsubmit = (e) => {
  e.preventDefault();

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
    default:
      break;
  }
};

//Função para converter a moeda
function convertCurrency(amount, price, symbol) {
  try {
    let newAmount;
    //aplica a classe que exibe o footer para mostrar o resultado
    footer.classList.add("show-result");

    //Realiza o calculo do preço e arredonda para 2 casas
    newAmount = (amount * price).toFixed(2);
    newAmount = formatCurrencyBRL(newAmount).replace("R$", "");
    

    //Insere os valores no front
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;
    result.textContent = `${newAmount} Reais`;
  } catch (error) {
    //remove a classe que exibe o footer para mostrar o resultado
    footer.classList.remove("show-result");
    console.log(error);
    alert("Não foi possível converter");
  }
}

// Formata a moeda em real brasileiro
function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
