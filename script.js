// Color pallete code from: view-source:https://jstsch.com/code/canvas_fire/index.html
// Fire demo idea and algo from : https://lodev.org/cgtutor/fire.html

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var canvas = document.querySelector('#canvas');
var canvasContext = canvas.getContext('2d');

const SQAURE_SIZE = 10;
let ws = Math.floor(window.innerWidth / SQAURE_SIZE) + 1;
let hs = Math.floor(window.innerHeight / SQAURE_SIZE) + 1;
let fire = new Uint8ClampedArray(ws * hs);

function init() {
  window.addEventListener('resize', resizeCanvases);
  resizeCanvases();
}

init();

function resizeCanvases() {
  canvas.width = canvas.width = window.innerWidth;
  canvas.height = canvas.height = window.innerHeight;

  
  canvas.style.top = 0;
  canvas.style.left = 0;

  ws = Math.floor(canvas.width / SQAURE_SIZE) + 1;
  hs = Math.floor(canvas.height / SQAURE_SIZE) + 1;
  fire = new Uint8ClampedArray(ws * hs);
}

        
var colors = [];
function generateColorPallete(colors) {  
  for (var i = 0; i < 256; i++) {
    var color = [];
    color[0] = 0;
    color[1] = 0;
    color[2] = 0;
    colors[i] = color;
  }
  for (var i = 0; i < 32; ++i) {
    colors[i][2] = i << 1;

    colors[i + 32][0] = i << 3;
    colors[i + 32][2] = 64 - (i << 1);

    colors[i + 64][0] = 255;
    colors[i + 64][1] = i << 3;

    colors[i + 96][0] = 255;
    colors[i + 96][1] = 255;
    colors[i + 96][2] = i << 2;
    colors[i + 128][0] = 255;
    colors[i + 128][1] = 255;
    colors[i + 128][2] = 64 + (i << 2);
    colors[i + 160][0] = 255;
    colors[i + 160][1] = 255;
    colors[i + 160][2] = 128 + (i << 2);
    colors[i + 192][0] = 255;
    colors[i + 192][1] = 255;
    colors[i + 192][2] = 192 + i;
    colors[i + 224][0] = 255;
    colors[i + 224][1] = 255;
    colors[i + 224][2] = 224 + i;
  } 
}

generateColorPallete(colors);

function randomButtomRow(fire) {
  for (let i = 0; i < ws; i += 1){
    fire[(hs - 1) * ws + i] = getRandomInt(255);
  }
}


function simulateFire(fire) {
  for (let y = 0; y < hs; y += 1){
    for (let x = 0; x < ws; x += 1){
      fire[y * ws + x] = 
     (((fire[((y + 1) % hs) * ws + ((x - 1) % ws)] +
        fire[((y + 1) % hs) * ws + ((x)     % ws)] +
        fire[((y + 1) % hs) * ws + ((x + 1) % ws)] +
        fire[((y + 2) % hs) * ws + ((x)     % ws)]) * 32) / 129) % 255;
    }
  }
}

function tick() {
  randomButtomRow(fire);
  simulateFire(fire);

  for (let y = 0; y < hs; y += 1){
    for (let x = 0; x < ws; x += 1){
      let c = colors[fire[y * ws + x]];
      canvasContext.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, 255)`;
      canvasContext.fillRect(Math.floor(x * SQAURE_SIZE) - SQAURE_SIZE, Math.floor(y * SQAURE_SIZE) - SQAURE_SIZE, SQAURE_SIZE, SQAURE_SIZE);
    }
  }
}

setInterval(tick, 10);