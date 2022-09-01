// Captura os elementos no DOM
const buttonRandomColor = document.getElementById('button-random-color');
const colorsInPalette = document.getElementsByClassName('color');
const pixelBoard = document.getElementById('pixel-board');
const pixelLine = document.getElementsByClassName('pixel-line');
const pixel = document.getElementsByClassName('pixel');
let numberOfPixelLines = 5;
let numberOfColorsInColorPalletes = 4;

// Carrega as cores do localStorage
window.onload = function() {
  let lS = JSON.parse(localStorage.getItem('color'));
  for (let index = 1; index < colorsInPalette.length; index += 1) {
    let randomColor = colorsInPalette[index];
    let oldColor = lS[index - 1];
    randomColor.style.backgroundColor = oldColor;
  }
  colorsInPalette[0].className = 'color selected';
}

// Gerador de cores aleatórias excluindo o branco e o preto.
function colorGenerator() {
  const hexadecimalCharacteres = '0123456789ABCDEF';
  let color = '#';
  for (let index = 0; index < 6; index += 1) {
    color += hexadecimalCharacteres[Math.floor(Math.random()* 16)];
  }
  if (color === '#FFFFFF' || color === '#000000') {
    for (let index = 0; index < 6; index += 1) {
        color += hexadecimalCharacteres[Math.floor(Math.random()* 16)];
    }     
  }  
  return color;
}

// cria a função do botão gerador de cores aleatórias e salva elas no localStorage
let color = [];
for (let index = 1; index < colorsInPalette.length; index += 1) {
  let randomColor = colorsInPalette[index];
  buttonRandomColor.addEventListener('click', selectRandomColors);
  function selectRandomColors() {
    randomColor.style.backgroundColor = colorGenerator();
    color.push(randomColor.style.backgroundColor);
    localStorage.color = JSON.stringify(color);
  }
}

// Aplica a class selected na cor escolhida
for (let index = 0; index < colorsInPalette.length; index += 1) {
  let color = colorsInPalette[index];
  color.addEventListener('click', function() {
    if (color.className === 'color') {
      for (let index = 0; index < colorsInPalette.length; index += 1) {
        if (colorsInPalette[index] != color) {
          colorsInPalette[index].className = 'color';
        }
      }
      color.className = 'color selected';
      console.log(color.style.backgroundColor);
    }
  })
}

// Aplica a cor escolhida no pixel selecionado
for (let index = 0; index < pixel.length; index += 1) {
  let selectedPixel = pixel[index];
  let selectedColor = document.getElementsByClassName('color selected');
  selectedPixel.addEventListener('click', colorPixel);
  function colorPixel() {
    let bgColorSelected = selectedColor[0].style.backgroundColor;
    selectedPixel.style.backgroundColor = bgColorSelected;
  }
}


