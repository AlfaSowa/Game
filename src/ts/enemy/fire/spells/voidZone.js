import { createFillCircle } from "../../../engine/engine";

const config = {
    radius: 150,
    maxRadius: 300,
};

export class VoidZone {
    radius = config.radius;
    color = "#5400c3";
    finish = false;
    vel = 1.5;

    bubbleHp = 100;
    bubbleRadius = 50;
    bubbleColor = "#280358";

    crash = false;

    constructor(opt) {
        this.coord = { x: opt.coord.x, y: opt.coord.y };
        this.bubbleCoord = { x: opt.coord.x, y: opt.coord.y };
    }

    createZone = (hero) => {
        if (this.radius < config.maxRadius) {
            this.radius += 0.1;
        }

        createFillCircle(this.coord.x, this.coord.y, this.radius, this.color);

        let delta = { x: hero.coord.x - this.coord.x, y: hero.coord.y - this.coord.y };
        let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

        if (dist < this.radius + hero.radius) {
            hero.curHp -= 1;
        }
    };

    bubble = (boss, hero) => {
        let delta = { x: boss.coord.x - this.bubbleCoord.x, y: boss.coord.y - this.bubbleCoord.y };
        let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

        this.bubbleCoord.x += (this.vel * delta.x) / dist;
        this.bubbleCoord.y += (this.vel * delta.y) / dist;

        if (dist > boss.radius + this.bubbleRadius) {
            createFillCircle(this.bubbleCoord.x, this.bubbleCoord.y, this.bubbleRadius, this.bubbleColor);
        } else {
            if (this.bubbleRadius > 0) {
                createFillCircle(this.bubbleCoord.x, this.bubbleCoord.y, this.bubbleRadius, this.bubbleColor);
                this.bubbleRadius -= 1;
                if (boss.shield <= boss.maxShield) {
                    boss.shield += 0.3;
                }
            } else {
                this.finish = true;
            }
        }

        let deltaHero = { x: hero.coord.x - this.bubbleCoord.x, y: hero.coord.y - this.bubbleCoord.y };
        let distHero = Math.sqrt(deltaHero.x * deltaHero.x + deltaHero.y * deltaHero.y);

        if (distHero < this.bubbleRadius + hero.radius) {
            hero.curHp -= 0.6;
            this.bubbleRadius -= 0.1;
            if (this.bubbleRadius <= 35) {
                this.bubbleColor = "red";
            }
            if (this.bubbleRadius <= 30) {
                this.finish = true;
            }
        }
    };

    draw = (boss, hero) => {
        this.createZone(hero);

        if (!this.finish) {
            this.bubble(boss, hero);
        }

        if (this.crash) {
            this.bubbleCoord = { x: this.coord.x, y: this.coord.y };
            this.bubbleRadius = 50;
            this.bubbleColor = "#280358";
            this.vel = 0.6;
            this.bubbleRadius = 35;
            this.finish = false;
            this.crash = false;
        }
    };
}
