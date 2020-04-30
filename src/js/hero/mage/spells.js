import { config } from "../../config";

export class Bullet {
    radius = 5;
    finish = false;

    constructor(coord, mouse, ctx) {
        this.ctx = ctx;
        this.coord = { x: coord.x, y: coord.y };
        this.mouse = { x: mouse.x, y: mouse.y };
    }

    draw = () => {
        this.ctx.fillStyle = "#fff";
        this.ctx.beginPath();
        this.ctx.arc(this.coord.x, this.coord.y, this.radius, 0, config.TWO_PI);
        this.ctx.closePath();
        this.ctx.fill();

        if (this.coord.x != this.mouse.x || this.coord.y != this.mouse.y) {
            let delta = { x: this.mouse.x - this.coord.x, y: this.mouse.y - this.coord.y };
            let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

            if (dist <= 9) {
                this.finish = true;
            } else {
                this.coord.x += (9 * delta.x) / dist;
                this.coord.y += (9 * delta.y) / dist;
            }
        }
    };
}
