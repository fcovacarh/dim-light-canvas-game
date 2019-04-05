var canvas,
  canvasW,
  canvasH,
  canvasOffset,
  offsetX,
  offsetY,
  ctx,
  fps = 60,
  bgMusic,
  SPAWN_RANGE = 100,
  player,
  PLAYER_SPEED = 5,
  enemies = [],
  corpses = [],
  deadEnemies = 0,
  nextEnemyId = 0,
  ENEMIES_SPEED = 1,
  ENEMIES_BASE_HEALTH = 3,
  ENEMIES_FREQUENCY = 150,
  ENEMIES_MIN_FREQ = 20,
  ENEMIES_SPECIES = [
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
  ],
  generatedEnemies = 0,
  waveLength = 5,
  shotsFired = [],
  flames = [];

function init() {
  document.querySelector('#start-btn').style.display = 'none';
  setEventListeners();
  canvas = document.querySelector("#game");
  canvasW = canvas.width = window.innerWidth * 0.8;
  canvasH = canvas.height = window.innerHeight * 0.8;
  ctx = canvas.getContext("2d");
  bgMusic = new Audio("sounds/bg_music.mp3");
  bgMusic.play();
  createPlayer(canvasW / 2, canvasH / 2);
  if (deadEnemies < waveLength) {
    generateEnemy();
  }
  var framesCounter = 0;
  var gameInterval = setInterval(() => {
    framesCounter++;
    if(ENEMIES_FREQUENCY <= ENEMIES_MIN_FREQ && enemies.length === 0) {
      clearInterval(gameInterval);
      win();
    }

    if (framesCounter % ENEMIES_FREQUENCY === 0 && ENEMIES_FREQUENCY > ENEMIES_MIN_FREQ) {
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
          var droppedItem = enemy.dropItem();
          if (droppedItem) {
            flames.push(droppedItem);
          }
          enemies.splice(enemyIdx, 1);
          corpses.push(enemy.die());
          deadEnemies++;
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
      corpses.push(enemy.die());
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
    "images/player.png",
    ctx,
    canvasW,
    canvasH,
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
      enemyProps.dropRate,
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
  if (deadEnemies > 0 && deadEnemies % waveLength === 0) {
    ENEMIES_FREQUENCY > ENEMIES_MIN_FREQ ? (ENEMIES_FREQUENCY -= ENEMIES_MIN_FREQ) : null;
    waveLength < 15 ? (waveLength += 5) : null;
  }
}

function drawAll(framesCounter) {
  corpses.forEach(dead => dead.draw(framesCounter));
  shotsFired.forEach(shot => shot.draw());
  flames.forEach(flame => flame.draw(framesCounter));
  enemies.forEach(enemy => enemy.draw(framesCounter));
  player.draw(framesCounter, canvasW, canvasH);
}

function win() {
  console.log("win")
}

function gameOver() {
  console.log("game over");
}
