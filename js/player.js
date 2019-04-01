class Player extends Character {
    constructor(x, y, dimX, dimY, image, ctx, rotation, health){
        super(x, y, dimX, dimY, image, ctx, rotation, health);
        this.rotation = rotation; //rotation in degrees
        this.health = health;
        console.log("Here I am!", `${this.x}, ${this.y}, ${this.dimX}, ${this.dimY}`);
    }

    draw() {
        //Maybe check for collisions
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.x, this.y, this.dimX, this.dimY);
    }

    shoot() {
        console.log("PEW PEW!");
    }
}