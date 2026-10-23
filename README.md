# Chamador de Senhas

Sistema de chamada de senhas que eu criei para uma lanchonete. O atendente cadastra o pedido com o nome do cliente no computador e, quando o pedido fica pronto, a TV toca um ding-dong, mostra a senha e o nome e anuncia em voz alta.

🔗 **Teste aqui:** [vamos colocar o link no pedaço 3]

## O problema que ele resolve

No horário de pico, o atendente chamava os clientes em voz alta e muitos não ouviam. Identifiquei o problema e ofereci um sistema de senhas para organizar a fila de espera e chamar os clientes que ficavam aguardando.

## Funcionalidades

- Cadastro do pedido com o nome do cliente e senha automática
- Fila de espera em ordem de chegada
- Chamar qualquer cliente da fila, mesmo fora de ordem
- Tela da TV que atualiza sozinha quando o atendente chama alguém
- Ding-dong e aviso por voz: "Senha 3, João"
- Os dados continuam salvos mesmo se o navegador fechar
- Botão para zerar as senhas no começo do dia

## Tecnologias

- HTML, CSS e JavaScript puro, sem frameworks
- `localStorage` e JSON para salvar os dados no navegador
- Evento `storage` para o painel e a TV se comunicarem sem servidor
- Web Audio API para o ding-dong
- `speechSynthesis` para a voz

## Como usar

1. Abra o painel e clique em **Abrir tela da TV**.
2. Leve a janela da TV para o segundo monitor (Windows + P → Estender).
3. Clique na tela da TV para ativar o som.
4. Cadastre os pedidos e chame os clientes pelo painel.

## O que eu aprendi

- Montar a estrutura de uma página com HTML
- Separar o projeto em HTML, CSS e JavaScript, cada um na sua pasta
- Deixar a página com cores, espaços e cantos arredondados usando CSS
- Colocar elementos lado a lado com Flexbox
- Fazer um botão executar uma ação quando é clicado
- Guardar os dados no navegador para não perder quando a página recarrega
- Salvar cada etapa do projeto com commits no Git