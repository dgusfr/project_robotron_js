const controle = document.querySelectorAll("[data-controle]");
const estatistica = document.querySelectorAll("[data-estatistica]");

const componentes = {
  bracos: {
    forca: 29,
    poder: 30,
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
    energia: 30,
    velocidade: -24,
  },
  pernas: {
    forca: 27,
    poder: 21,
    energia: -30,
    velocidade: 42,
  },
  foguetes: {
    forca: 0,
    poder: 28,
    energia: 0,
    velocidade: -2,
  },
};

const MAX_VALOR_COMPONENTE = 30; // Valor máximo para cada componente

controle.forEach((elemento) => {
  elemento.addEventListener("click", (evento) => {
    const operacao = evento.target.dataset.controle; // Pega a operação do data-controle
    manipulaDados(operacao, evento.target.parentNode);
    atualizaEstatistica(evento.target.dataset.componente, operacao);
  });
});

function manipulaDados(operacao, controle) {
  const componente = controle.querySelector("[data-contador]");
  let novoValor;

  if (operacao === "-") {
    novoValor = parseInt(componente.value) - 1;
  } else {
    novoValor = parseInt(componente.value) + 1;
  }

  // Verifica se o novo valor ultrapassa o máximo
  if (novoValor > MAX_VALOR_COMPONENTE) {
    novoValor = MAX_VALOR_COMPONENTE;
  }

  // Atualiza o valor do componente como inteiro
  componente.value = novoValor;

  // Redistribui a diferença para os outros componentes se necessário
  redistribuiDiferenca(controle, novoValor);
}

function redistribuiDiferenca(controleAtual, novoValor) {
  const componentesAtualizados = document.querySelectorAll("[data-contador]");
  const totalAtual = Array.from(componentesAtualizados).reduce(
    (total, comp) => total + parseInt(comp.value),
    0
  );

  // Calcula a diferença entre o total atual e o valor máximo permitido
  const diferenca = totalAtual - MAX_VALOR_COMPONENTE;

  // Se houver diferença, redistribui para os outros componentes
  if (diferenca > 0) {
    const outrosControles = Array.from(componentesAtualizados).filter(
      (comp) => comp !== controleAtual.querySelector("[data-contador]")
    );

    outrosControles.forEach((outroControle) => {
      const valorAtual = parseInt(outroControle.value);
      const diferencaRedistribuir = (valorAtual / totalAtual) * diferenca;
      outroControle.value = valorAtual - diferencaRedistribuir;

      // Garante que os valores não fiquem negativos
      if (parseInt(outroControle.value) < 0) {
        outroControle.value = 0;
      }
    });
  }
}

function atualizaEstatistica(componente, operacao) {
  estatistica.forEach((elemento) => {
    const operacaoMultiplier = operacao === "+" ? 1 : -1;
    elemento.textContent =
      parseInt(elemento.textContent) +
      operacaoMultiplier *
        componentes[componente][elemento.dataset.estatistica];
  });
}
