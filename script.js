const COLOR_SELECTED = 'color selected';

// Elementos capturados pelo DOM
const cores = document.getElementsByClassName('color');

// Variaveis de ajuste de quantidades
const numeroDeCoresNaPaleta = 4;
let numeroDeLinhas = 5;

// Início do código
// // Salva o desenho no localStorage
// function salvaDesenho() {
//   const desenho = [];
//   for (let index = 0; index < pixel.length; index += 1) {
//     desenho.push(pixel[index].style.backgroundColor);
//     localStorage.pixelBoard = JSON.stringify(desenho);
//   }
// }

// Cria o titulo h1
const title = document.createElement('h1');
title.id = 'title';
title.innerText = 'Paleta de Cores';
document.body.appendChild(title);

// Cria a section do color-palette
const paletaDeCores = document.createElement('section');
paletaDeCores.id = 'color-palette';
document.body.appendChild(paletaDeCores);

// Cria o espaço para as quatro cores na paleta de cores
for (let index = 1; index <= numeroDeCoresNaPaleta; index += 1) {
  const color = document.createElement('div');
  color.className = 'color';
  color.id = `cor${index}`;
  paletaDeCores.appendChild(color);
}

const BLACK = 'rgb(0, 0, 0)';
// Colore  inicialemnte a paleta de cores
const cor = [BLACK, 'rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)'];
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

// Faz o botão gerar cores aleatórias na paletade cores e salva no localStorage
function criaCoresAleatorias() {
  const ultimasCores = [BLACK];
  for (let index = 1; index < numeroDeCoresNaPaleta; index += 1) {
    cores[index].style.backgroundColor = geradorDeCores();
    cores[0].style.backgroundColor = BLACK;
    ultimasCores.push(cores[index].style.backgroundColor);
    localStorage.colorPalette = JSON.stringify(ultimasCores);
  }
}
botao.addEventListener('click', criaCoresAleatorias);

// Campo para preencher novo tamanho tamanha do quadro de pixel
const campoNovoQuadro = document.createElement('input');
campoNovoQuadro.id = 'board-size';
campoNovoQuadro.setAttribute('type', 'number');
campoNovoQuadro.setAttribute('min', '1');
campoNovoQuadro.setAttribute('max', '50');
document.body.appendChild(campoNovoQuadro);

// Botão para criar o novo tamanho tamanha do quadro de pixel
const btnNovoQuadro = document.createElement('button');
btnNovoQuadro.id = 'generate-board';
btnNovoQuadro.innerText = 'VQV';
document.body.appendChild(btnNovoQuadro);

// Cria o botão que limpa o quadro de pixels
const btnResetColor = document.createElement('button');
btnResetColor.id = 'clear-board';
btnResetColor.innerText = 'Limpar';
document.body.appendChild(btnResetColor);

// Criando o pixel board
const quadroPixels = document.createElement('section');
quadroPixels.id = 'pixel-board';
document.body.appendChild(quadroPixels);

// Criando o quadro de pixels
function criandoOsPixels() {
  for (let index = 1; index <= numeroDeLinhas; index += 1) {
    const linhaPixels = document.createElement('div');
    linhaPixels.className = 'linha-pixel';
    quadroPixels.appendChild(linhaPixels);
    for (let index2 = 1; index2 <= numeroDeLinhas; index2 += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      linhaPixels.appendChild(pixel);
    }
  }
}
criandoOsPixels();

// Deletando o quadro de pixels
function deletandoQuadroPixels() {
  quadroPixels.innerHTML = '';
}

function deletaAntigoECriaNovoQuadro() {
  if (campoNovoQuadro.value < 5) {
    window.alert('Board inválido!');
    deletandoQuadroPixels();
    numeroDeLinhas = 5;
    criandoOsPixels();
    localStorage.boardSize = JSON.stringify(numeroDeLinhas);
  } else if (campoNovoQuadro.value > 50) {
    window.alert('Board inválido!');
    deletandoQuadroPixels();
    numeroDeLinhas = 50;
    criandoOsPixels();
    localStorage.boardSize = JSON.stringify(numeroDeLinhas);
  } else {
    deletandoQuadroPixels();
    numeroDeLinhas = campoNovoQuadro.value;
    criandoOsPixels();
    localStorage.boardSize = JSON.stringify(numeroDeLinhas);
  }
}

// Trocando o pixel board
btnNovoQuadro.addEventListener('click', deletaAntigoECriaNovoQuadro);

// Altera a classe da cor selecionada para COLOR_SELECTED e as demais apenas color #8
for (let index = 0; index < cores.length; index += 1) {
  const corSelected = cores[index];
  corSelected.addEventListener('click', () => {
    if (corSelected.className === 'color') {
      for (let index2 = 0; index2 < cores.length; index2 += 1) {
        if (cores[index2] !== 'color') {
          cores[index2].className = 'color';
        }
      }
      corSelected.className = COLOR_SELECTED;
    }
  });
}

const pixel = document.getElementsByClassName('pixel');

// Salva o desenho no localStorage
function salvaDesenho() {
  const desenho = [];
  for (let index = 0; index < pixel.length; index += 1) {
    desenho.push(pixel[index].style.backgroundColor);
    localStorage.pixelBoard = JSON.stringify(desenho);
  }
}

// Colorindo o pixel com a cor selecionada
for (let index = 0; index < pixel.length; index += 1) {
  const colorePixel = () => {
    const corSelecionada = document.getElementsByClassName(COLOR_SELECTED);
    pixel[index].style.backgroundColor = corSelecionada[0].style.backgroundColor;
    salvaDesenho();
  };
  pixel[index].addEventListener('click', colorePixel);
}

// Cria a ação de limpar o quadro com o botão Limpar
const limpaQuadro = () => {
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].style.backgroundColor = '#FFFFFF';
  }
};
btnResetColor.addEventListener('click', limpaQuadro);

// Carrega as cores do localStorage na paleta de cores
window.onload = () => {
  if (localStorage.colorPalette !== undefined) {
    const coresDoLocalStorage = JSON.parse(localStorage.colorPalette);
    for (let index = 0; index < numeroDeCoresNaPaleta; index += 1) {
      cores[index].style.backgroundColor = coresDoLocalStorage[index];
    }
  }

  // Importa o desenho salvo no localStorage
  if (localStorage.pixelBoard !== undefined) {
    const desenho = JSON.parse(localStorage.pixelBoard);
    for (let index = 0; index < pixel.length; index += 1) {
      pixel[index].style.backgroundColor = desenho[index];
    }
  }

  // Defini a cor preta como selecionada
  cores[0].className = COLOR_SELECTED;

  // Importando o tamanho do pixel board
  if (localStorage.boardSize) {
    numeroDeLinhas = JSON.parse(localStorage.boardSize);
    deletandoQuadroPixels();
    criandoOsPixels();
  }
};
