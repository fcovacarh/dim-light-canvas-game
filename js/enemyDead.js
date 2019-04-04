class EnemyDead {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "./images/enemy-dead.png";
    this.frameIndex = 0;
    this.frames = 4;
    this.dimX = 32;
    this.dimY = 32;
  }

  draw(framesCounter) {
    if(framesCounter % 6 == 0){
      this.frameIndex++;
      if (this.frameIndex >= this.frames - 1) this.frameIndex = 0;
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
}
