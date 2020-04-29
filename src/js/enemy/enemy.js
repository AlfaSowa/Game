import { config } from "../config";

export class Enemy {
    constructor(options) {
        this.ctx = options.ctx;
        this.mouse = options.mouse;
        this.coord = {
            x: options.x,
            y: options.y,
        };
        this.radius = options.radius;
        this.alarmRadius = options.radius + 100;

        this.alarm = "#bfbfbf";
        this.color = "blue";
        this.slow = 1;
        this.speed = 2;
    }

    createCircle() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.coord.x, this.coord.y, this.radius, 0, config.TWO_PI);
        this.ctx.closePath();
        this.ctx.fill();
    }

    tauntRadius() {
        this.ctx.strokeStyle = this.alarm;
        this.ctx.beginPath();
        this.ctx.arc(this.coord.x, this.coord.y, this.alarmRadius, 0, config.TWO_PI);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    getRadius = () => {
        if (
            this.mouse.x > this.coord.x - this.alarmRadius &&
            this.mouse.x < this.coord.x + this.alarmRadius &&
            this.mouse.y > this.coord.y - this.alarmRadius &&
            this.mouse.y < this.coord.y + this.alarmRadius
        ) {
            this.moveTo(true);
            this.alarm = "red";
            this.color = "red";
        } else {
            this.moveTo(false);
            this.alarm = "#bfbfbf";
            this.color = "blue";
        }
    };

    gerPatchX = () => {
        if (this.coord.x < this.mouse.x) {
            return this.coord.x + this.speed / this.slow;
        } else {
            return this.coord.x - this.speed / this.slow;
        }
    };
    gerPatchY = () => {
        if (this.coord.y < this.mouse.y) {
            return this.coord.y + this.speed / this.slow;
        } else {
            return this.coord.y - this.speed / this.slow;
        }
    };

    moveTo = (acc) => {
        if (acc) {
            this.coord.x = this.gerPatchX();
            this.coord.y = this.gerPatchY();
        }
    };

    draw = () => {
        this.createCircle();
        this.tauntRadius();
        // this.getRadius();
    };
}
