import { config } from "../config";

const configHero = {
    mainColor: "#f72743",
};

export class Hero {
    target = { x: 500, y: 500 };
    slow = false;
    coord = { x: 500, y: 500 };

    mass = 1;
    radius = 25;

    testCircleColor = "red";

    constructor(opt) {
        this.ctx = opt.ctx;
        this.mouse = opt.mouse;
    }

    getTarget = () => {
        this.target = { x: this.mouse.x, y: this.mouse.y };
    };

    createCircle = (x, y, radius, color) => {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, config.TWO_PI);
        this.ctx.closePath();
        this.ctx.fill();
    };

    createStrokeCircle = (x, y, radius, color, lineWidth) => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineJoin = "none";
        this.ctx.lineWidth = lineWidth;
        this.ctx.arc(x, y, radius, 0, config.TWO_PI);
        this.ctx.stroke();
        this.ctx.closePath();
    };

    createCurHp = (x, y, radius) => {
        this.ctx.strokeStyle = "#e4e4e4";
        this.ctx.lineJoin = "none";
        this.ctx.lineWidth = this.stroke;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, config.TWO_PI / 3);
        this.ctx.stroke();
        this.ctx.closePath();
    };

    toMouseCoordMove = () => {
        if (this.coord.x != this.target.x || this.coord.y != this.target.y) {
            let delta = { x: this.target.x - this.coord.x, y: this.target.y - this.coord.y };
            let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

            if (dist <= this.vel) {
                this.coord.x = this.target.x;
                this.coord.y = this.target.y;
            } else {
                this.coord.x += ((this.vel * delta.x) / dist) * this.mass;
                this.coord.y += ((this.vel * delta.y) / dist) * this.mass;
            }
        }
    };

    getSlow = () => {
        if (this.slow) {
            this.color = "#066fb1";
            this.mass = (1 / 100) * 20;
        } else {
            this.color = configHero.mainColor;
            this.mass = 1;
        }
    };

    init() {
        window.addEventListener("mousedown", this.getTarget);
    }

    testCircle = () => {
        this.createStrokeCircle(700, 500, 20, this.testCircleColor, 2);
    };

    draw() {
        this.getSlow();
        this.toMouseCoordMove();
        this.createCircle(this.coord.x, this.coord.y, this.radius, this.color);

        this.createStrokeCircle(this.coord.x, this.coord.y, this.radius, "#404040", this.radius / 3);
        this.createCurHp(this.coord.x, this.coord.y, this.radius, this.curHp);

        this.testCircle();
    }
}
