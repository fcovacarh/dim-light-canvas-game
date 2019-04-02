var canvas, canvasW, canvasH, canvasOffset, offsetX, offsetY, ctx;
var fps = 60;
var preload;
var SPAWN_RANGE = 100;
var player;
var PLAYER_SPEED = 1;
var enemies = [];
var nextEnemyId = 0;
var ENEMIES_SPEED = 0.4; 
var ENEMIES_FREQUENCY = 500;
var shotsFired = [];

document.onmousemove = e => {
  var angle = getAngleBetween(
    { x: e.pageX, y: e.pageY },
    { x: canvasW / 2, y: canvasH / 2 }
  );
  updatePlayerPos(angle);
};

document.onmousedown = e => {
  shotsFired.push(player.shoot(e.pageX, e.pageY));
};

init();

function init() {
  canvas = document.querySelector("#game");
  canvasW = canvas.width = window.innerWidth * 0.98;
  canvasH = canvas.height = window.innerHeight * 0.98;
  ctx = canvas.getContext("2d");

  createPlayer(canvasW / 2, canvasH / 2);
  generateEnemy();
  var frameCounter = 0;
  setInterval(() => {
    frameCounter++;
    if (frameCounter % ENEMIES_FREQUENCY === 0) {
      generateEnemy();
    }
    checkIfEnemiesAreShot();
    enemies.forEach((enemy, idx) => {
      if (!enemy.checkForCollision()) {
        enemy.move();
      } else {
        player.takeDamage(10);
        enemies.splice(idx, 1);
      }
      enemy.move();
    });

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
      if(shot.checkIfCollision(enemy.x, enemy.y)) {
        console.log(enemy.health);
        shotsFired.splice(shotIdx, 1);
        enemy.takeDamage(shot.damage);
        if(enemy.health <= 0){
          enemies.splice(enemyIdx, 1);
        }
      }
    });
  });
}

function createPlayer(initialX, initialY) {
  player = new Player(
    initialX,
    initialY,
    50,
    50,
    "./images/basic-char-sheet.png",
    ctx,
    0,
    100,
    PLAYER_SPEED
  );
}

function updatePlayerPos(angle) {
  player.setRotation(angle);
  enemies.forEach(enemy => {
    enemy.playerX = player.x;
    enemy.playerY = player.y;
  });
}

function calculateRotationAngle() {
  var angle = Math.atan2(
    stage.mouseY - jetSprite.y,
    stage.mouseX - jetSprite.x
  );
  angle = angle * (180 / Math.PI);
}

function generateEnemy() {
  enemies.push(
    new Enemy(
      // getRandomInt(-1, canvasW + 1),
      // getRandomInt(-1, canvasH + 1),
      getRandomIntTwoRanges(-SPAWN_RANGE, 0, canvasW, canvasW + SPAWN_RANGE),
      getRandomIntTwoRanges(-SPAWN_RANGE, 0, canvasH, canvasH + SPAWN_RANGE),
      50,
      50,
      "",
      ctx,
      0,
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
