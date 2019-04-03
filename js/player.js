var BASE_SHOT_DAMAGE = 1;
var BASE_SHOT_SPEED = 6;

class Player extends Character {
  constructor(x, y, dimX, dimY, image, ctx, rotation, health, speed) {
    super(x, y, dimX, dimY, image, ctx, rotation, health, speed);
    this.img.src = image;
    this.img.frames = 3;
    this.img.frameIndex = 0;
    this.x = x;
    this.y = y;
    this.dimX = dimX;
    this.dimY = dimY;
    this.ctx = ctx;
    this.rotation = rotation;
    this.health = health;
    this.speed = speed;
  }

  draw(canvasW, canvasH) {
    super.draw();
    ctx.fillStyle = `rgba(0,0,0,${1 - this.health/100})`;
    ctx.fillRect(0, 0, canvasW, canvasH);
}
  
  shoot(destX, destY) {
    return new Shot(
      this.x,
      this.y,
      destX,
      destY,
      5,
      10,
      this.ctx,
      this.rotation,
      BASE_SHOT_SPEED,
      BASE_SHOT_DAMAGE
    );
  }

  takeDamage(damage) {
    this.health -= damage;
    console.log(`OUCH! (${this.health})`);
  }
}
