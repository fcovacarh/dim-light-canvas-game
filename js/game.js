var canvas, canvasW, canvasH, canvasOffset, offsetX, offsetY, ctx;
var fps = 60;
var preload;
var SPAWN_RANGE = 100;
var player;
var PLAYER_SPEED = 5;
var enemies = [];
var deadEnemies = [];
var nextEnemyId = 0;
var ENEMIES_SPEED = 1;
var ENEMIES_BASE_HEALTH = 3;
var ENEMIES_FREQUENCY = 100;
var ENEMIES_SPECIES = [
  {
    name: "Red Insect",
    image: "./images/enemy1.png",
    health: 3,
    speed: 1,
    dropRate: 0.5
  },
  {
    name: "Green Insect",
    image: "./images/enemy2.png",
    health: 5,
    speed: 0.5,
    dropRate: 0.7
  }
];
var generatedEnemies = 0;
var waveLength = 5;
var shotsFired = [];
var flames = [];

init();

function init() {
  canvas = document.querySelector("#game");
  canvasW = canvas.width = window.innerWidth;
  canvasH = canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");

  createPlayer(canvasW / 2, canvasH / 2);
  generateEnemy();
  var framesCounter = 0;
  var gameInterval = setInterval(() => {
    framesCounter++;
    if (
      generatedEnemies < waveLength &&
      framesCounter % ENEMIES_FREQUENCY === 0 &&
      ENEMIES_FREQUENCY > 0
    ) {
      generateEnemy();
    }
    checkIfFlameTaken();
    checkIfEnemiesAreShot();
    checkIfEnemiesAttacked(gameInterval);

    shotsFired.forEach((shot, idx) => {
      if (shot.x < 0 || shot.x > canvasW || shot.y < 0 || shot.y > canvasH) {
        shotsFired.splice(idx, 1);
      } else {
        shot.move();
      }
    });
    ctx.clearRect(0, 0, canvasW, canvasH);
    drawAll(framesCounter);
  }, 1000 / fps);
}

function checkIfFlameTaken() {
  flames.forEach((flame, flameIdx) => {
    if (flame.checkForCollision(player.dimX)) {
      player.heal(getRandomInt(10, 20));
      flames.splice(flameIdx, 1);
    }
  });
}

function checkIfEnemiesAreShot() {
  enemies.forEach((enemy, enemyIdx) => {
    shotsFired.forEach((shot, shotIdx) => {
      if (shot.checkIfCollision(enemy.x, enemy.y, enemy.dimX)) {
        shotsFired.splice(shotIdx, 1);
        enemy.takeDamage(shot.damage);
        if (enemy.isDead()) {
          flames.push(enemy.dropItem());
          enemies.splice(enemyIdx, 1);
          deadEnemies.push(enemy.die());
        }
      }
    });
  });
}

function checkIfEnemiesAttacked(gameInterval) {
  enemies.forEach((enemy, idx) => {
    if (!enemy.checkForCollision(player.dimX)) {
      enemy.move();
    } else {
      player.takeDamage(10);
      if (player.isDead()) {
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
  flames.forEach(flame => {
    flame.updatePlayerPos(player.x, player.y);
  });
}

function generateRandomEnemy(enemyX, enemyY, angle) {
  var type = getRandomInt(0, ENEMIES_SPECIES.length - 1);
  var enemyProps = ENEMIES_SPECIES[type];
  enemies.push(
    new Enemy(
      enemyX,
      enemyY,
      32,
      32,
      enemyProps.image,
      ctx,
      angle,
      enemyProps.health,
      enemyProps.speed,
      player.x,
      player.y
    )
  );
}

function generateEnemy() {
  var enemyX = getRandomIntTwoRanges(
    -SPAWN_RANGE,
    0,
    canvasW,
    canvasW + SPAWN_RANGE
  );
  var enemyY = getRandomIntTwoRanges(
    -SPAWN_RANGE,
    0,
    canvasH,
    canvasH + SPAWN_RANGE
  );
  var angle = getAngleBetween(
    { x: enemyX, y: enemyY },
    { x: player.x, y: player.y }
  );
  generateRandomEnemy(enemyX, enemyY, angle);
  generatedEnemies++;
  if (deadEnemies.length % waveLength === 0) {
    ENEMIES_FREQUENCY -= 10;
    generatedEnemies = 0;
    waveLength += 5;
  }
}

function drawAll(framesCounter) {
  deadEnemies.forEach(dead => dead.draw(framesCounter));
  shotsFired.forEach(shot => shot.draw());
  flames.forEach(flame => flame.draw(framesCounter));
  enemies.forEach(enemy => enemy.draw(framesCounter));
  player.draw(framesCounter, canvasW, canvasH);
}

function gameOver() {
  console.log("game over");
}
