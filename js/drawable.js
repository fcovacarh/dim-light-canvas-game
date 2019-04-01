class Drawable {
    constructor(x, y, dimX, dimY, image, ctx) {
        this.x = x;
        this.y = y;
        this.dimX = dimX;
        this.dimY = dimY;
        this.img = image;
        this.ctx = ctx;
    }

    move(incrX, incrY) {
        this.x += incrX;
        this.y += incrY;
    }

    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, this.dimX, this.dimY);
    }
}