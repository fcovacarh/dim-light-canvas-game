class Enemy extends Character {
  constructor(
    x,
    y,
    dimX,
    dimY,
    image,
    ctx,
    rotation,
    health,
    speed,
    id,
    playerX,
    playerY
  ) {
    super(x, y, dimX, dimY, image, ctx, rotation, health, speed);
    this.id = id;
    this.playerX = playerX;
    this.playerY = playerY;
  }

  updatePlayerPos(playerX, playerY) {
    this.playerX = playerX;
    this.playerY = playerY;
    this.rotation = getAngleBetween(
      { x: this.x, y: this.y },
      { x: this.playerX, y: this.playerY }
    );
  }

  checkForCollision(playerDiameter) {
    return getVectorMagnitude({x: this.playerX - this.x, y: this.playerY - this.y}) < playerDiameter;
  }

  draw() {
    this.ctx.fillStyle = "red";
    super.draw();
  }

  move() {
    var directionVector = this.getDirection(this.playerX, this.playerY);
    super.move(directionVector.x, directionVector.y);
  }

  takeDamage(damage){
    this.health -= damage;
  }
}
