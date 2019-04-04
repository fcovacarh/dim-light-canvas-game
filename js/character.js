class Character {
  constructor(x, y, dimX, dimY, image, ctx, rotation, health, speed) {
    this.x = x;
    this.y = y;
    this.dimX = dimX;
    this.dimY = dimY;
    this.img = new Image();
    this.img.src = image;
    this.frameIndex = 0;
    this.frames = 4;
    this.ctx = ctx;
    this.rotation = rotation; //rotation in degrees
    this.health = health;
    this.speed = speed;
  }

  getDirection(x, y) {
    return normalizeVector({ x: x - this.x, y: y - this.y });
  }

  setRotation(angle) {
    this.rotation = angle;
  }

  move(incrX, incrY) {
    this.x += incrX * this.speed;
    this.y += incrY * this.speed;
  }

  draw(framesCounter) {
    console.log(this.frameIndex, this.frameIndex * this.dimX);
    if (framesCounter % 6 === 0) {
      this.frameIndex++;
      if (this.frameIndex >= 3) this.frameIndex = 0;
    }
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(-this.rotation);
    this.ctx.drawImage(
      this.img,
      this.frameIndex * this.dimX,
      0,
      this.dimX,
      this.dimY,
      this.dimX / 2,
      this.dimY / 2,
      -this.dimX,
      -this.dimY
    );
    this.ctx.restore();
  }
}
