var BASE_SHOT_DAMAGE = 1;
var BASE_SHOT_SPEED = 6;

class Player extends Character {
  constructor(x, y, dimX, dimY, image, ctx, rotation, health, speed) {
    super(x, y, dimX, dimY, image, ctx, rotation, health, speed);
    this.health = health;
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
