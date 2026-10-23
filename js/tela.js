// Pega os elementos da tela da TV
const tvSenha = document.getElementById("tv-senha");
const tvNome = document.getElementById("tv-nome");
const tvFila = document.getElementById("tv-fila");
const btnSom = document.getElementById("btn-som");

let somAtivado = false;
let ultimoChamado = null;

// Fala um texto em voz alta, em português
function falar(texto) {
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  speechSynthesis.speak(fala);
}

// Lê a gaveta e desenha a tela
function atualizarTela() {
  const texto = localStorage.getItem("chamador");

  if (texto === null) {
    return;
  }

  const dados = JSON.parse(texto);

    // Quem está sendo chamado
  if (dados.chamado === null) {
    tvSenha.textContent = "--";
    tvNome.textContent = "";
    ultimoChamado = null;
  } else {
    tvSenha.textContent = dados.chamado.senha;
    tvNome.textContent = dados.chamado.nome;

    if (somAtivado && dados.chamado.senha !== ultimoChamado) {
      falar("Senha " + dados.chamado.senha + ", " + dados.chamado.nome);
    }                                               
    ultimoChamado = dados.chamado.senha;
  }

  // Quem está aguardando
  tvFila.innerHTML = "";
  for (const cliente of dados.fila) {
    const item = document.createElement("li");
    item.textContent = cliente.senha + "  " + cliente.nome;
    tvFila.appendChild(item);
  }
}

// Quando a TV abre, desenha com o que já está salvo
atualizarTela();

// Quando o painel mudar a gaveta, a TV atualiza sozinha
window.addEventListener("storage", (evento) => {
  if (evento.key === "chamador") {
    atualizarTela();
  }
});

// Quando clicar no botão: libera o som e coloca em tela cheia
btnSom.addEventListener("click", () => {
  somAtivado = true;
  btnSom.remove();
  falar("Som ativado");
  document.documentElement.requestFullscreen();
});