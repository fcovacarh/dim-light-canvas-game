var BASE_SHOT_DAMAGE = 1;
var BASE_SHOT_SPEED = 6;

class Player extends Character {
  constructor(x, y, dimX, dimY, image, ctx, rotation, health, speed) {
    super(x, y, dimX, dimY, image, ctx, rotation, health, speed);
    this.img.src = image;
    this.x = x;
    this.y = y;
    this.dimX = dimX;
    this.dimY = dimY;
    this.ctx = ctx;
    this.rotation = rotation;
    this.health = health;
    this.speed = speed;
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(-this.rotation);
    //this.ctx.fillRect(-this.dimX/2, -this.dimY/2, this.dimX, this.dimY);
    this.ctx.drawImage(
      this.img,
      0,
      0,
      this.dimX,
      this.dimY,
      this.dimX/2,
      this.dimY/2,
      -this.dimX,
      -this.dimY
    );
    this.ctx.restore();
}
  
  shoot(destX, destY) {
    return new Shot(
      this.x,
      this.y,
      destX,
      destY,
      10,
      15,
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
