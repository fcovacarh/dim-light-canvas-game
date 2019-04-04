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
    dropRate,
    playerX,
    playerY
  ) {
    super(x, y, dimX, dimY, image, ctx, rotation, health, speed);
    this.dropRate = dropRate;
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
    return (
      getVectorMagnitude({
        x: this.playerX - this.x,
        y: this.playerY - this.y
      }) < playerDiameter
    );
  }

  move() {
    var directionVector = this.getDirection(this.playerX, this.playerY);
    super.move(directionVector.x, directionVector.y);
  }

  takeDamage(damage) {
    this.health -= damage;
  }

  dropItem() {
    if(Math.random() > this.dropRate){
      return new Flame(this.x, this.y, this.playerX, this.playerY, this.ctx);
    }
  }

  die() {
    return new EnemyDead(this.x, this.y, this.ctx);
  }
}
