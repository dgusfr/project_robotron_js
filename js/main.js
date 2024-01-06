const controle = document.querySelectorAll("[data-controle]");
const estatistica = document.querySelectorAll("[data-estatistica]");

const componentes = {
  bracos: {
    forca: 29,
    poder: 35,
    energia: -21,
    velocidade: -5,
  },

  blindagem: {
    forca: 41,
    poder: 20,
    energia: 0,
    velocidade: -20,
  },
  nucleos: {
    forca: 0,
    poder: 7,
    energia: 48,
    velocidade: -24,
  },
  pernas: {
    forca: 27,
    poder: 21,
    energia: -32,
    velocidade: 42,
  },
  foguetes: {
    forca: 0,
    poder: 28,
    energia: 0,
    velocidade: -2,
  },
};

//"controle" é o elemento clicável que de interação.
// "componente" é a parte específica dos dados associados a esse controle
controle.forEach((elemento) => {
  elemento.addEventListener("click", (evento) => {
    // Quando um elemento é clicado, chama a função manipulaDados com o
    // conteúdo de texto do elemento clicado e o pai desse elemento
    manipulaDados(evento.target.textContent, evento.target.parentNode);

    // Chama a função atualizaEstatistica com o valor do atributo 'data-componente' do elemento clicado
    atualizaEstatistica(evento.target.dataset.componente);
  });
});

// Manipula os dados associados aos controles (Braços, Blindagem,...)
function manipulaDados(operacao, controle) {
  // Seleciona o componente associado ao controle
  const componente = controle.querySelector("[data-contador]");

  // Verifica se a operação é uma subtração ("-")
  if (operacao === "-") {
    // Decrementa o valor do componente
    componente.value = parseInd(componente.value) - 1;
  } else {
    // Caso contrário, incrementa o valor do componente
    componente.value = parseInt(componente.value) + 1;
  }
}

// Atualiza as estatísticas associadas aos diferentes componentes
function atualizaEstatistica(componente) {
  // Para cada elemento de estatística
  estatistica.forEach((elemento) => {
    // Atualiza o conteúdo com a soma do valor atual e o valor do componente fornecido
    elemento.textContent =
      parseInt(elemento.textContent) +
      componentes[componente][elemento.dataset.estatistica];
  });
}
