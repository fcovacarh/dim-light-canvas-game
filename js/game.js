var canvas, canvasW, canvasH, ctx;
var fps = 60;
var preload;
var player;

init();

function init() {
  canvas = document.querySelector("#game");
  canvas.width = window.innerWidth * 0.98;
  canvasW = canvas.width;
  canvas.height = window.innerHeight * 0.98;
  canvasH = canvas.height;
  ctx = canvas.getContext("2d");

  createPlayer();
  setInterval(() => {
    ctx.clearRect(0, 0, canvasW, canvasH);
    drawAll();
  }, 1000 / fps);
}

function createPlayer() {
  player = new Player(
    canvasW / 2,
    canvasH / 2,
    100,
    100,
    "./images/basic-char-sheet.png",
    ctx,
    0,
    100
  );

  console.log(toRadians(player.rotation));
}

function drawAll() {
  player.draw();
}
