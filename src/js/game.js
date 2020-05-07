import { BossFactory } from "./enemy/bossFactory";
import { HeroFactory } from "./heroes/heroFactory";

let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");

class Game {
    objects = [];
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

    init() {
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
        this.hero = heroFactory.createHero("mage");
        this.hero.init();

        this.objects.push(this.boss);

        requestAnimationFrame(this.draw);
    }

    draw = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.boss.draw();
        this.hero.draw(this.objects);
        requestAnimationFrame(this.draw);
    };
}

const game = new Game();
game.init();
