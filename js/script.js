// Pega os elementos da página pelo id
const formPedido = document.getElementById("form-pedido");
const inputNome = document.getElementById("input-nome");
const listaFila = document.getElementById("fila");
const senhaAtual = document.getElementById("senha-atual");
const nomeAtual = document.getElementById("nome-atual");
const btnZerar = document.getElementById("btn-zerar");
const btnRepetir = document.getElementById("btn-repetir");

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
    senhaAtual.textContent = "--";
    nomeAtual.textContent = "";
    return;
  }
  senhaAtual.textContent = chamado.senha;
  nomeAtual.textContent = chamado.nome;
}

// Chama o cliente: tira da fila e mostra em "Chamando agora"
function chamarCliente(cliente) {
  fila = fila.filter((c) => c.senha !== cliente.senha);
  chamado = cliente;
  chamado.hora = Date.now();

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

// Quando clicar em "Chamar de novo"...
btnRepetir.addEventListener("click", () => {
  if (chamado === null) {
    alert("Ninguém foi chamado ainda!");
    return;
  }

  chamado.hora = Date.now();
  salvarDados();
});

// Quando clicar em "Zerar senhas"...
btnZerar.addEventListener("click", () => {
  const confirmou = confirm("Zerar todas as senhas e começar do 1?");

  if (confirmou === false) {
    return;
  }

  proximaSenha = 1;
  fila = [];
  chamado = null;

  salvarDados();
  mostrarChamado();
  mostrarFila();
});

// Quando a página abre: pega os dados salvos e desenha a tela
carregarDados();
mostrarChamado();
mostrarFila();
