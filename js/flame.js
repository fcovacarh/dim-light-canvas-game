class Flame{
  constructor(x, y, playerX, playerY, ctx) {
    this.x = x;
    this.y = y;
    this.playerX = playerX;
    this.playerY = playerY;
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = './images/flame.png';
    this.dimX = 32;
    this.dimY = 32;
    this.frameIndex = 0;
  }

  updatePlayerPos(playerX, playerY) {
    this.playerX = playerX;
    this.playerY = playerY;
  }

  draw(framesCounter) {
    if (framesCounter % 6=== 0) {
      this.frameIndex++;
      if (this.frameIndex >= 3) this.frameIndex = 0;
    }
    this.ctx.drawImage(
      this.img,
      this.frameIndex * this.dimX,
      0,
      this.dimX,
      this.dimY,
      this.x,
      this.y,
      this.dimX,
      this.dimY
    );
  }

  checkForCollision(playerDiameter) {
    return getVectorMagnitude({x: this.playerX - this.x, y: this.playerY - this.y}) < playerDiameter;
  }
}
