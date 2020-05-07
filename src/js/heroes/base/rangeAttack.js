const random = (min, max) => Math.random() * (max - min) + min;

export class RangeAttack {
    radius = 8;
    finish = false;
    vel = 10;
    color = "#0081dc";

    constructor(coord, mouse, ctx, spread) {
        this.ctx = ctx;
        this.mouse = { x: mouse.x + random(-spread, spread), y: mouse.y + random(-spread, spread) };
        this.coord = { x: coord.x, y: coord.y };
        this.startCoord = { x: coord.x, y: coord.y };
    }

    createBullet = () => {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.coord.x, this.coord.y, this.radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
    };

    damage = (obj, damage) => {
        obj.forEach((object) => {
            let delta = { x: object.coord.x - this.coord.x, y: object.coord.y - this.coord.y };
            let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

            if (object.shield) {
                if (dist <= object.shieldRadius) {
                    object.shield -= damage;
                    this.finish = true;
                }
            } else {
                if (dist < object.radius) {
                    object.curHp -= damage;
                    this.finish = true;
                }
            }
        });
    };

    gas = () => {
        let delta = { x: this.startCoord.x - this.coord.x, y: this.startCoord.y - this.coord.y };
        let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
        if (dist > this.radius + 10) {
            //....
        }
    };

    moveBullet = () => {
        if (this.coord.x != this.mouse.x || this.coord.y != this.mouse.y) {
            let delta = { x: this.mouse.x - this.coord.x, y: this.mouse.y - this.coord.y };
            let angle = Math.atan2(delta.y, delta.x);

            if (this.coord.x > 0 && this.coord.x < innerWidth && this.coord.y > 0 && this.coord.y < innerHeight) {
                this.coord.x += Math.cos(angle) * this.vel;
                this.coord.y += Math.sin(angle) * this.vel;
                this.mouse.x += Math.cos(angle) * this.vel;
                this.mouse.y += Math.sin(angle) * this.vel;
            } else {
                this.finish = true;
            }
        }
    };

    draw = () => {
        this.createBullet();
        this.moveBullet();
    };
}
