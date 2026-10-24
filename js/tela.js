// Pega os elementos da tela da TV
const tvSenha = document.getElementById("tv-senha");
const tvNome = document.getElementById("tv-nome");
const tvFila = document.getElementById("tv-fila");
const btnSom = document.getElementById("btn-som");

let somAtivado = false;
let ultimoChamado = null;
let audioCtx = null;

// Fala um texto em voz alta, em português
function falar(texto) {
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  speechSynthesis.speak(fala);
}

// Toca uma nota, como uma tecla de teclado que vai sumindo
function tocarNota(frequencia, atraso) {
  const inicio = audioCtx.currentTime + atraso;
  const oscilador = audioCtx.createOscillator();
  const volume = audioCtx.createGain();

  oscilador.frequency.value = frequencia;
  volume.gain.setValueAtTime(0.5, inicio);
  volume.gain.exponentialRampToValueAtTime(0.001, inicio + 1);

  oscilador.connect(volume);
  volume.connect(audioCtx.destination);

  oscilador.start(inicio);
  oscilador.stop(inicio + 1);
}

// Duas notas: uma aguda (ding) e uma mais grave (dong)
function dingDong() {
  tocarNota(880, 0);
  tocarNota(660, 0.5);
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

      if (somAtivado && dados.chamado.hora !== ultimoChamado) {
      dingDong();
      setTimeout(() => {
        falar("Senha " + dados.chamado.senha + ", " + dados.chamado.nome);
      }, 1500);
    }
    ultimoChamado = dados.chamado.hora;

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
  audioCtx = new AudioContext();
  btnSom.remove();
  dingDong();
  setTimeout(() => falar("Som ativado"), 1500);
  document.documentElement.requestFullscreen();
});
