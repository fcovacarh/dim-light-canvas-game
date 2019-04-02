class Shot {
    constructor(initX, initY, destX, destY, dimX = 10, dimY = 15, ctx, rotation, speed = 2, damage){
        this.x = initX;
        this.y = initY;
        this.dimX = dimX;
        this.dimY = dimY;
        this.ctx = ctx;
        this.rotation = rotation;
        this.speed = speed;
        this.damage = damage;
        this.directionVector = normalizeVector({x: destX - initX, y: destY - initY});
    }

    move() {
        this.x += this.directionVector.x * this.speed;
        this.y += this.directionVector.y * this.speed;
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(-this.rotation);
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(-this.dimX/2, -this.dimY/2, this.dimX, this.dimY);
        this.ctx.restore();
    }

    checkIfCollision(checkX, checkY) {
        return getVectorMagnitude({x: checkX - this.x, y: checkY - this.y}) <= this.dimX;
    }
}