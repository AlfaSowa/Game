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
        this.puffs = [];
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

        for (let i = 0; i < 5; i++) {
            this.walls.push(new Wall({ ctx: this.ctx, x: random(0, config.canvasWidth), y: random(300, config.canvasHeight) }));
        }

        for (let i = 0; i < 5; i++) {
            this.puffs.push(new Puff({ ctx: this.ctx, x: random(0, config.canvasWidth), y: random(300, config.canvasHeight) }));
        }

        this.boss.init();
        this.mage.init();

        this.gameObjects = [this.boss, ...this.walls, ...this.puffs];
    };

    testCircle = () => {
        this.createCircle(700, 500, 20, "red");
    };

    checkCoord = (hero, add, radius) => {
        let delta = { x: hero.coord.x - add.coord.x, y: hero.coord.y - add.coord.y };
        let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
        return dist - hero.radius < radius ? true : false;
    };

    draw = () => {
        this.boss.draw(this.mage);
        this.mage.draw(this.gameObjects);
        this.walls.forEach((wall) => {
            wall.draw();
            if (this.checkCoord(this.mage, wall, wall.blastRadius)) {
                this.mage.curHp -= 0.5;
            }
        });
        this.puffs.map((e) => e.draw());
    };
}

class Wall {
    constructor(opt) {
        this.ctx = opt.ctx;
        this.coord = {
            x: opt.x,
            y: opt.y,
        };
        this.radius = 40;
        this.color = "red";
        //плотность
        this.density = "hight";

        this.blastRadius = this.radius;
    }

    createStrokeCircle = (x, y, radius, color, lineWidth) => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineJoin = "none";
        this.ctx.lineWidth = lineWidth;
        this.ctx.arc(x, y, radius, 0, config.TWO_PI);
        this.ctx.stroke();
        this.ctx.closePath();
    };

    createCircle = (x, y, radius, color) => {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, config.TWO_PI);
        this.ctx.closePath();
        this.ctx.fill();
    };

    draw() {
        this.createCircle(this.coord.x, this.coord.y, this.radius, this.color);
        this.createStrokeCircle(this.coord.x, this.coord.y, this.blastRadius, "red", 2);
        if (this.blastRadius < this.radius * 4) {
            this.blastRadius += 0.5;
        } else {
            this.blastRadius = this.radius;
        }
    }
}

class Puff {
    constructor(opt) {
        this.ctx = opt.ctx;
        this.coord = {
            x: opt.x,
            y: opt.y,
        };
        this.radius = 20;
        this.color = "blue";
        //плотность
        this.density = "mid";
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
