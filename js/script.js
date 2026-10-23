// Pega os elementos da página pelo id
const formPedido = document.getElementById("form-pedido");
const inputNome = document.getElementById("input-nome");
const listaFila = document.getElementById("fila");
const senhaAtual = document.getElementById("senha-atual");
const nomeAtual = document.getElementById("nome-atual");

let proximaSenha = 1;
let fila = [];
let chamado = null;

// Guarda tudo no navegador para não perder ao recarregar
function salvarDados() {
  const dados = {
    proximaSenha: proximaSenha,
    fila: fila,
    chamado: chamado,
  };
  localStorage.setItem("chamador", JSON.stringify(dados));
}

// Pega da gaveta o que foi salvo antes
function carregarDados() {
  const texto = localStorage.getItem("chamador");

  if (texto === null) {
    return;
  }

  const dados = JSON.parse(texto);
  proximaSenha = dados.proximaSenha;
  fila = dados.fila;
  chamado = dados.chamado;
}

// Mostra em "Chamando agora" quem foi chamado
function mostrarChamado() {
  if (chamado === null) {
    return;
  }
  senhaAtual.textContent = chamado.senha;
  nomeAtual.textContent = chamado.nome;
}

// Chama o cliente: tira da fila e mostra em "Chamando agora"
function chamarCliente(cliente) {
  fila = fila.filter((c) => c.senha !== cliente.senha);
  chamado = cliente;

  salvarDados();
  mostrarChamado();
  mostrarFila();
}

// Desenha a fila na tela
function mostrarFila() {
  listaFila.innerHTML = "";

  for (const cliente of fila) {
    const item = document.createElement("li");
    item.textContent = cliente.senha + " - " + cliente.nome;

    const botao = document.createElement("button");
    botao.textContent = "Chamar";
    botao.addEventListener("click", () => {
      chamarCliente(cliente);
    });
    item.appendChild(botao);

    listaFila.appendChild(item);
  }
}

// Quando o formulário for enviado...
formPedido.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = inputNome.value.trim();

  if (nome === "") {
    alert("Digite o nome do cliente!");
    return;
  }

  const senha = proximaSenha;
  proximaSenha = proximaSenha + 1;

  fila.push({ senha: senha, nome: nome });
  salvarDados();
  mostrarFila();

  inputNome.value = "";
});

// Quando a página abre: pega os dados salvos e desenha a tela
carregarDados();
mostrarChamado();
mostrarFila();
