var canvas, canvasW, canvasH, canvasOffset, offsetX, offsetY, ctx;
var fps = 60;
var preload;
var SPAWN_RANGE = 100;
var player;
var PLAYER_SPEED = 5;
var enemies = [];
var nextEnemyId = 0;
var ENEMIES_SPEED = 1; 
var ENEMIES_FREQUENCY = 500;
var shotsFired = [];

init();

function init() {
  canvas = document.querySelector("#game");
  canvasW = canvas.width = window.innerWidth * 0.98;
  canvasH = canvas.height = window.innerHeight * 0.98;
  ctx = canvas.getContext("2d");
  //ctx.scale(.6, .6)

  createPlayer(canvasW / 2, canvasH / 2);
  generateEnemy();
  var frameCounter = 0;
  var gameInterval = setInterval(() => {
    frameCounter++;
    if (frameCounter % ENEMIES_FREQUENCY === 0) {
      generateEnemy();
    }
    checkIfEnemiesAreShot();
    checkIfEnemiesAttacked(gameInterval);

    shotsFired.forEach((shot, idx) => {
      if (shot.x < 0 || shot.x > canvasW || shot.y < 0 || shot.y > canvasH) {
        shotsFired.splice(idx, 1)
      } else {
        shot.move();
      }
    });
    ctx.clearRect(0, 0, canvasW, canvasH);
    drawAll();
  }, 1000 / fps);
}

function checkIfEnemiesAreShot() {
  enemies.forEach((enemy, enemyIdx) => {
    shotsFired.forEach((shot, shotIdx) => {
      if(shot.checkIfCollision(enemy.x, enemy.y, enemy.dimX)) {
        shotsFired.splice(shotIdx, 1);
        enemy.takeDamage(shot.damage);
        if(enemy.health <= 0){
          enemies.splice(enemyIdx, 1);
        }
      }
    });
  });
}

function checkIfEnemiesAttacked(gameInterval){
  enemies.forEach((enemy, idx) => {
    if (!enemy.checkForCollision(player.dimX)) {
      enemy.move();
    } else {
      player.takeDamage(10);
      if(player.health <= 0) {
        clearInterval(gameInterval);
        gameOver();
      }
      enemies.splice(idx, 1);
    }
    enemy.move();
  });
}

function createPlayer(initialX, initialY) {
  player = new Player(
    initialX,
    initialY,
    32,
    32,
    "images/player_flipped.png",
    ctx,
    0,
    100,
    PLAYER_SPEED
  );
} 

function updatePlayerPos(angle) {
  player.setRotation(angle);
  enemies.forEach(enemy => {  
    enemy.updatePlayerPos(player.x, player.y);
  });

}

function generateEnemy() {
  var enemyX = getRandomIntTwoRanges(-SPAWN_RANGE, 0, canvasW, canvasW + SPAWN_RANGE);
  var enemyY = getRandomIntTwoRanges(-SPAWN_RANGE, 0, canvasH, canvasH + SPAWN_RANGE);
  var angle = getAngleBetween({x: enemyX, y: enemyY}, {x: player.x, y: player.y});

  enemies.push(
    new Enemy(
      enemyX,
      enemyY,
      32,
      32,
      "images/player.png",
      ctx,
      angle,
      10,
      ENEMIES_SPEED,
      nextEnemyId,
      player.x,
      player.y
    )
  );
  nextEnemyId++;
}

function drawAll() {
  shotsFired.forEach(shot => shot.draw());
  enemies.forEach(enemy => enemy.draw());
  player.draw();
}

function gameOver() {
  alert("Game Over :(");
}
