// Elementos capturados pelo DOM
const cores = document.getElementsByClassName('color');

// Variaveis de ajuste de quantidades
let numeroDeCoresNaPaleta = 4;
let numeroDeLinhas = 5;

// Início do código

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
  let color = document.createElement('div');
  color.className = 'color';
  color.id = 'cor' + index;
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

// Faz o botão gerar cores aleatórias na paletade cores e salva no localStorage
botao.addEventListener('click', criaCoresAleatorias);
function criaCoresAleatorias() {
  let ultimasCores = ['rgb(0, 0, 0)',];
  for (let index = 1; index < numeroDeCoresNaPaleta; index += 1) {
    cores[index].style.backgroundColor = geradorDeCores();
    cores[0].style.backgroundColor = 'rgb(0, 0, 0)';
    ultimasCores.push(cores[index].style.backgroundColor);
    localStorage.colorPalette = JSON.stringify(ultimasCores);
  }
}

// Carrega as cores do localStorage na paleta de cores
window.onload = function() {
  if (localStorage.colorPalette !== undefined) {
    let coresDoLocalStorage = JSON.parse(localStorage.colorPalette);
    for (let index = 0; index < numeroDeCoresNaPaleta; index += 1) {
      cores[index].style.backgroundColor = coresDoLocalStorage[index];
    }
  }

// Importa o desenho salvo no localStorage
  if (localStorage.pixelBoard !== undefined) {
    let desenho = JSON.parse(localStorage.pixelBoard);
    for (let index = 0; index < pixel.length; index += 1) {
      pixel[index].style.backgroundColor = desenho[index];
    }
  }

  // Defini a cor preta como selecionada
  cores[0].className = 'color selected';
}

// Campo para preencher novo tamanho tamanha do quadro de pixel
const campoNovoQuadro = document.createElement('input');
campoNovoQuadro.id = 'board-size';
campoNovoQuadro.setAttribute('type', 'number')
campoNovoQuadro.setAttribute('min', '5');
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
function criandoOsPixels(numeroDeLinhas) {
  for (let index = 1; index <= numeroDeLinhas; index += 1) {
    const linhaPixels = document.createElement('div');
    linhaPixels.className = 'linha-pixel';
    quadroPixels.appendChild(linhaPixels);
    for (let index = 1; index <= numeroDeLinhas; index += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      linhaPixels.appendChild(pixel);
    }
  }
}
criandoOsPixels(numeroDeLinhas);

function deletaAntigoECriaNovoQuadro() {
  if (campoNovoQuadro.value == 0) {
    window.alert('Board inválido!')
  } else {
    deletandoQuadroPixels();
    numeroDeLinhas = campoNovoQuadro.value;
    criandoOsPixels(numeroDeLinhas);
    if (campoNovoQuadro.value >= 5 && campoNovoQuadro.value <= 50) {
      deletandoQuadroPixels();
      numeroDeLinhas = campoNovoQuadro.value;
      criandoOsPixels(numeroDeLinhas);
    } else {
      window.alert('Board inválido! TRente um número de 5 à 50.')
    }
  }

}

// Trocando o pixel board
btnNovoQuadro.addEventListener('click', deletaAntigoECriaNovoQuadro);

// Deletando o quadro de pixels
function deletandoQuadroPixels() {
  quadroPixels.innerHTML = '';
}

// Altera a classe da cor selecionada para 'color selected' e as demais apenas color #8
for (let index = 0; index < cores.length; index += 1) {
  let cor = cores[index];
  cor.addEventListener('click', function() {
    if (cor.className === 'color') {
      for (let index = 0; index < cores.length; index += 1) {
        if (cores[index] != 'color') {
          cores[index].className = 'color';
        }
      }
      cor.className = 'color selected';
    }
  })
}

// Color o pixel com a cor selecionada
const pixel = document.getElementsByClassName('pixel');
for (let index = 0; index < pixel.length; index += 1) {
  pixel[index].addEventListener('click', colorePixel);
  function colorePixel() {
    let corSelecionada = document.getElementsByClassName('color selected');
    pixel[index].style.backgroundColor = corSelecionada[0].style.backgroundColor;
    salvaDesenho();
  }
}

// Cria a ação de limpar o quadro com o botão Limpar
btnResetColor.addEventListener('click', limpaQuadro);
function limpaQuadro() {
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].style.backgroundColor = '#FFFFFF'
  }
}

// Salva o desenho no localStorage
function salvaDesenho() {
  let desenho = [];
  for (let index = 0; index < pixel.length; index += 1) {
    desenho.push(pixel[index].style.backgroundColor);
    localStorage.pixelBoard = JSON.stringify(desenho);
  }
}

