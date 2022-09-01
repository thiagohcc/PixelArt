// Elementos capturados pelo DOM
const title = document.getElementById('title');
const cores = document.getElementsByClassName('color');

// Variaveis de ajuste de quantidades
let numeroDeCoresNaPaleta = 4;

// Início do código

// Cria a section do color-palette
const paletaDeCores = document.createElement('section');
paletaDeCores.className = 'color-palette';
title.appendChild(paletaDeCores);

// Cria o espaço para as quatro cores na paleta de cores
for (let index = 1; index <= numeroDeCoresNaPaleta; index += 1) {
  let color = document.createElement('div');
  color.className = 'color';
  paletaDeCores.appendChild(color);
}

// Colore  inicialemnte a paleta de cores
const cor = ['rgb(0, 0, 0)', 'rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)']
for (let index = 0; index < cores.length; index += 1) {
  cores[index].style.backgroundColor = cor[index];
}

// Cria o botão para gerar cores aleatŕoias
const botao = document.createElement('button');
botao.id = 'button-random-color';
botao.innerText = 'Cores aleatórias';
paletaDeCores.appendChild(botao);

// Gerador de cores aleatórias
function geradorDeCores() {
  const caracteresHexadecimais = '0123456789ABCDEF';
  let corAleatoria = '#';
  for (let index = 0; index < 6; index += 1) {
    corAleatoria += caracteresHexadecimais[Math.floor(Math.random() * 16)];
  }
  if (corAleatoria === '#FFFFFF' || corAleatoria === '#000000') {
    for (let index = 0; index < 6; index += 1) {
      corAleatoria += caracteresHexadecimais[Math.floor(Math.random() * 16)];
    }
  }
  return corAleatoria;
}

// Faz o botão gerar cores aleatórias na paletade cores
botao.addEventListener('click', criaCoresAleatorias);
function criaCoresAleatorias() {
  for (let index = 1; index < numeroDeCoresNaPaleta; index += 1) {
    cores[index].style.backgroundColor = geradorDeCores();
  }
}
