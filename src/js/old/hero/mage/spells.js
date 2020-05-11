import { config } from "../../config";

export class Bullet {
    radius = 5;
    finish = false;

    constructor(coord, mouse, ctx) {
        this.ctx = ctx;
        this.coord = { x: coord.x, y: coord.y };
        this.mouse = { x: mouse.x, y: mouse.y };
        this.vel = 10;
        this.energy = 100;
        this.collision = false;
    }

    damage = (obj) => {
        obj.forEach((object) => {
            let delta = { x: object.coord.x - this.coord.x, y: object.coord.y - this.coord.y };
            let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

            if (dist < object.radius) {
                object.color = "green";

                if (object.density) {
                    switch (object.density) {
                        case "hight":
                            this.finish = true;

                            break;

                        case "mid":
                            this.vel = 4;
                            this.collision = true;
                            break;

                        default:
                            this.finish = true;
                            break;
                    }
                } else {
                    if (object.curHp) {
                        object.curHp -= 20;
                    }
                    this.finish = true;
                }
            }

            if (this.collision) {
                if (this.energy > 0) {
                    this.energy -= 0.15;
                } else {
                    this.finish = true;
                }
            }
        });
    };

    draw = () => {
        this.ctx.fillStyle = "#fff";
        this.ctx.beginPath();
        this.ctx.arc(this.coord.x, this.coord.y, this.radius, 0, config.TWO_PI);
        this.ctx.closePath();
        this.ctx.fill();

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
}
