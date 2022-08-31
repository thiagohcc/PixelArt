// Captura os elementos no DOM
const buttonRandomColor = document.getElementById('button-random-color');
const colorsInPalette = document.getElementsByClassName('color');

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

// Carrega as cores do localStorage
window.onload = function() {
  let lS = JSON.parse(localStorage.getItem('color'));
  for (let index = 1; index < colorsInPalette.length; index += 1) {
    let randomColor = colorsInPalette[index];
    let oldColor = lS[index - 1];
    randomColor.style.backgroundColor = oldColor;
  }
}



