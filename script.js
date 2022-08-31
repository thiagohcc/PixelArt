// Gerador de cores aleatórias excluindo o braco e o preto.
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