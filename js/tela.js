// Pega os elementos da tela da TV
const tvSenha = document.getElementById("tv-senha");
const tvNome = document.getElementById("tv-nome");
const tvFila = document.getElementById("tv-fila");

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
  } else {
    tvSenha.textContent = dados.chamado.senha;
    tvNome.textContent = dados.chamado.nome;
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