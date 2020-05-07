import { config } from "../../config";
import { slow } from "../../spells/slow";

export class Boss {
    curHp = 400;
    maxHp = 400;

    constructor(opt) {
        this.ctx = opt.ctx;

        this.coord = { x: opt.x, y: opt.y };
        this.radius = opt.radius;
        this.color = "blue";
        this.useSlow = false;

        this.voids = [];
        this.pseudoVoids = [];

        this.heroCoord = {
            x: 0,
            y: 0,
        };
    }

    createCircle(x, y, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, config.TWO_PI);
        this.ctx.closePath();
        this.ctx.fill();
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

    createCurHp = (x, y, radius) => {
        this.ctx.strokeStyle = "#e4e4e4";
        this.ctx.lineJoin = "none";
        this.ctx.lineWidth = this.stroke;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, (Math.PI / 100) * ((100 / this.maxHp) * this.curHp));
        this.ctx.stroke();
        this.ctx.closePath();
    };

    checkCoord = (hero, add) => {
        let delta = { x: hero.coord.x - add.coord.x, y: hero.coord.y - add.coord.y };
        let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
        return dist - hero.radius < add.radius ? true : false;
    };

    createBoss = (hero) => {
        this.heroCoord = {
            x: hero.coord.x,
            y: hero.coord.y,
        };
        this.createCircle(this.coord.x, this.coord.y, this.radius, this.color);
    };

    // createVoid = () => {
    //     this.pseudoVoids.push({ coord: { x: this.heroCoord.x, y: this.heroCoord.y }, radius: 50 });

    //     let voidCoord = {
    //         x: this.heroCoord.x,
    //         y: this.heroCoord.y,
    //     };

    //     this.voids.forEach((item) => {
    //         if (item.radius < 100) {
    //             item.radius = item.radius + 10;
    //         }
    //     });

    //     setTimeout(() => {
    //         this.voids.push({ coord: { x: voidCoord.x, y: voidCoord.y }, radius: 50 });
    //     }, 3000);
    // };

    // clearVoids = () => {
    //     this.voids = [];
    //     this.pseudoVoids = [];
    // };

    // drawVoid = () => {
    //     this.pseudoVoids.forEach((item) => {
    //         this.createCircle(item.coord.x, item.coord.y, item.radius, "blue");
    //     });

    //     this.voids.forEach((item) => {
    //         this.createCircle(item.coord.x, item.coord.y, item.radius, "red");
    //     });
    // };

    // checkVoid = (hero) => {
    //     let check = false;
    //     for (let i = 0; i < this.voids.length; i++) {
    //         this.checkCoord(hero, this.voids[i]) ? (check = true) : null;
    //     }

    //     return check;
    // };

    // getSlow = (hero) => {
    //     if (this.checkCoord(hero, this) || this.checkVoid(hero)) {
    //         hero.slow = true;
    //         hero.curHp -= 2;
    //     } else {
    //         hero.slow = false;
    //     }
    // };

    init = () => {
        //начнется через 15000 после старта
        // setInterval(() => this.createVoid(), 5000);
        // setInterval(() => this.clearVoids(), 25000);
    };

    draw = (hero) => {
        this.createBoss(hero);
        this.createCircle(this.coord.x, this.coord.y, this.radius, this.color);
        this.createStrokeCircle(this.coord.x, this.coord.y, this.radius, "#404040", this.radius / 5);
        this.createCurHp(this.coord.x, this.coord.y, this.radius, this.curHp);
        // this.drawVoid();
        // this.getSlow(hero);
    };
}
