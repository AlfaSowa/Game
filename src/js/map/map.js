import { Boss } from "../enemy/boss/boss";
import { config } from "../config";
import { Mage } from "../hero/mage/mage";
import { Bullet } from "../hero/mage/spells";

const random = (min, max) => Math.random() * (max - min) + min;

export class Map {
    constructor(options) {
        this.ctx = options.ctx;
        this.mouse = options.mouse;
        this.walls = [];
    }

    createCircle = (x, y, radius, color) => {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, config.TWO_PI);
        this.ctx.closePath();
        this.ctx.fill();
    };

    init = () => {
        this.boss = new Boss({
            ctx: this.ctx,
            x: config.canvasWidth / 2,
            y: 0,
            radius: 300,
        });

        this.mage = new Mage({
            ctx: this.ctx,
            mouse: this.mouse,
            radius: 35,
        });

        for (let i = 0; i < 20; i++) {
            this.walls.push(new Wall({ ctx: this.ctx, x: random(0, config.canvasWidth), y: random(300, config.canvasHeight) }));
        }

        this.boss.init();
        this.mage.init();

        this.gameObjects = [this.boss, ...this.walls];
    };

    testCircle = () => {
        this.createCircle(700, 500, 20, "red");
    };

    draw = () => {
        this.boss.draw(this.mage);
        this.mage.draw(this.gameObjects);
        this.walls.map((e) => e.draw());
    };
}

class Wall {
    constructor(opt) {
        this.ctx = opt.ctx;
        this.coord = {
            x: opt.x,
            y: opt.y,
        };
        this.radius = 20;
        this.color = "red";
    }

    createCircle = (x, y, radius, color) => {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, config.TWO_PI);
        this.ctx.closePath();
        this.ctx.fill();
    };

    draw() {
        this.createCircle(this.coord.x, this.coord.y, this.radius, this.color);
    }
}
