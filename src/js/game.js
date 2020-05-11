import { BossFactory } from "./enemy/bossFactory";
import { HeroFactory } from "./heroes/heroFactory";

let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");

class Game {
    objects = [];
    end = false;

    constructor() {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = this.canvas.width = innerWidth;
        this.height = this.canvas.height = innerHeight;
        this.start = false;

        this.mouse = {
            x: this.width / 2,
            y: this.height / 2,
            down: false,
        };
    }

    setPos = ({ layerX, layerY }) => {
        [this.mouse.x, this.mouse.y] = [layerX, layerY];
    };

    isDown = () => {
        this.mouse.down = !this.mouse.down;
    };

    init(hero) {
        this.canvas.addEventListener("mousemove", this.setPos);
        window.addEventListener("mousedown", this.isDown);
        window.addEventListener("mouseup", this.isDown);

        const bossFactory = new BossFactory({
            canvas: this.canvas,
            ctx: this.ctx,
        });
        this.boss = bossFactory.createBoss("fire");
        this.boss.init();

        const heroFactory = new HeroFactory({
            canvas: this.canvas,
            ctx: this.ctx,
            mouse: this.mouse,
        });
        this.hero = heroFactory.createHero(hero);
        this.hero.init();

        this.objects.push(this.boss);

        requestAnimationFrame(this.draw);
    }

    drawCursor = () => {
        this.objects.forEach((obj) => {
            if (
                this.mouse.x > obj.coord.x - obj.radius &&
                this.mouse.x < obj.coord.x + obj.radius &&
                this.mouse.y > obj.coord.y - obj.radius &&
                this.mouse.y < obj.coord.y + obj.radius
            ) {
                this.canvas.style.cursor = "crosshair";
            } else {
                this.canvas.style.cursor = "auto";
            }
        });
    };

    draw = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawCursor();

        this.boss.draw(this.hero);
        this.hero.draw(this.objects);
        if (!this.end) {
            requestAnimationFrame(this.draw);
        } else {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.canvas.style.cursor = "auto";

            let gameOptions = document.querySelector(".game");
            let gameEnd = document.querySelector(".game__end");
            gameOptions.classList.remove("game--hide");
            gameEnd.classList.remove("game__end--hide");
        }

        if (this.boss.curHp <= 0) {
            this.objects.pop();
            this.end = true;
        }

        if (this.hero.curHp <= 0) {
            this.end = true;
        }
    };
}

export const game = new Game();
