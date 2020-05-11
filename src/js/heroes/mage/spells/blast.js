export class Blast {
    count = 150;
    finish = false;

    constructor(ctx, mouse) {
        this.ctx = ctx;
        this.coord = { x: mouse.x, y: mouse.y };
    }

    createCircle(x, y, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
    }

    draw = () => {
        this.count -= 1;
        if (this.count === 0) {
            this.finish = true;
        }
        this.createCircle(this.coord.x, this.coord.y, 100, "red");
    };
}
