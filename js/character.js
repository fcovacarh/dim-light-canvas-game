class Character {
  constructor(x, y, dimX, dimY, image, ctx, rotation, health, speed) {
    this.x = x;
    this.y = y;
    this.dimX = dimX;
    this.dimY = dimY;
    this.img = new Image();
    this.img.src = image;
    this.ctx = ctx;
    this.rotation = rotation; //rotation in degrees
    this.health = health;
    this.speed = speed;
  }


  setRotation(angle) {
    this.rotation = angle;
  }

  move(incrX, incrY) {
    this.x += incrX * this.speed;
    this.y += incrY * this.speed;
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(-this.rotation);
    this.ctx.fillRect(-this.dimX/2, -this.dimY/2, this.dimX, this.dimY);
    this.ctx.restore();
  }
}
