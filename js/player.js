class Player extends Character {
    constructor(x, y, dimX, dimY, image, ctx, rotation, health){
        super(x, y, dimX, dimY, image, ctx, rotation, health);
        this.health = health;
        console.log("Here I am!", `${this.x}, ${this.y}, ${this.dimX}, ${this.dimY}`);
    }

    draw() {
        //Maybe check for collisions
        super.draw();
    }

    shoot() {
        console.log("PEW PEW!");
    }
}