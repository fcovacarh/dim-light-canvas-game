var BASE_SHOT_DAMAGE = 1;

class Player extends Character {
    constructor(x, y, dimX, dimY, image, ctx, rotation, health){
        super(x, y, dimX, dimY, image, ctx, rotation, health);
        this.health = health;
    }

    draw() {
        //Maybe check for collisions
        this.ctx.fillStyle = 'green';
        super.draw();
    }

    shoot(destX, destY) {
        console.log("PEW PEW!");
        return new Shot(this.x, this.y, destX, destY, 10, 15, this.ctx, this.rotation, 2, BASE_SHOT_DAMAGE);
    }

    takeDamage(damage) {
        this.health -= damage;
        console.log(`OUCH! (${this.health})`);
    }
}