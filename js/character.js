class Character {
  constructor(x, y, dimX, dimY, image, ctx, rotation, health) {
    this.x = x;
    this.y = y;
    this.dimX = dimX;
    this.dimY = dimY;
    this.img = new Image();
    this.img.src = image;
    this.ctx = ctx;
    this.rotation = rotation; //rotation in degrees
    this.health = health;
  }

  move(incrX, incrY) {
    this.x += incrX;
    this.y += incrY;
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(toRadians(this.rotation));
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(-this.dimX/2, -this.dimY/2, this.dimX, this.dimY);
    this.ctx.restore();
    // this.img.onload = () => {
    //   //https://stackoverflow.com/questions/17411991/html5-canvas-rotate-image
    //   //http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/index.html
    //   this.ctx.fillStyle = 'green';
    //   this.ctx.fillRect(this.x - this.dimX/2, this.y - this.dimY/2, this.dimX, this.dimY);
    // };
  }
}
