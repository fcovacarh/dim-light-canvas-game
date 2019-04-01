var canvas, canvasW, canvasH, ctx;
var fps = 60;
var preload;
var player;

init();

function init() {
  canvas = document.querySelector("#game");
  canvas.width = window.innerWidth * 0.6;
  canvasW = canvas.width;
  canvas.height = window.innerHeight * 0.6;
  canvasH = canvas.height;
  ctx = canvas.getContext("2d");

  createPlayer();
  setInterval(() => {
      ctx.clearRect(0, 0, canvasW, canvasH);
      drawAll();
  }, 1000/fps);
}

function createPlayer() {
    player = new Player(canvasW/2, canvasH/2, 1000, 1000, './images/basic-char-sheet.png', ctx, 0, 100);
}

function drawAll() {
    player.draw();
}
