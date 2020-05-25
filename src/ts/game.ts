// import { BossFactory } from "./enemy/bossFactory";
import { HeroFactory } from "./heroes/heroFactory";
import { IGame } from "../types/general";

let canvas: HTMLCanvasElement = document.querySelector(".canvas");
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");

class Game implements IGame {
    objects: any[] = [];
    canvas = canvas;
    ctx = ctx;
    width = (this.canvas.width = innerWidth);
    height = (this.canvas.height = innerHeight);
    start = false;
    mouse = {
        x: this.width / 2,
        y: this.height / 2,
        down: false,
    };
    end = false;
    hero: any;

    setPos = (e: MouseEvent): void => {
        [this.mouse.x, this.mouse.y] = [e.clientX, e.clientY];
    };

    isDown = (e: MouseEvent): void => {
        this.mouse.down = !this.mouse.down;
    };

    init(heroName: string): void {
        this.canvas.addEventListener("mousemove", this.setPos);
        window.addEventListener("mousedown", this.isDown);
        window.addEventListener("mouseup", this.isDown);

        const heroFactory = new HeroFactory({
            canvas: this.canvas,
            ctx: this.ctx,
            mouse: this.mouse,
        });

        this.hero = heroFactory.createHero(heroName);
        this.hero.init();

        requestAnimationFrame(this.draw);
    }

    draw = (): void => {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.hero.draw(this.objects);
        requestAnimationFrame(this.draw);
    };

    // init(hero) {

    // const bossFactory = new BossFactory({
    //     canvas: this.canvas,
    //     ctx: this.ctx,
    // });
    // this.boss = bossFactory.createBoss("fire");
    // this.boss.init();

    // const heroFactory = new HeroFactory({
    //     canvas: this.canvas,
    //     ctx: this.ctx,
    //     mouse: this.mouse,
    // });
    // this.hero = heroFactory.createHero(hero);
    // this.hero.init();

    // this.objects.push(this.boss);

    // requestAnimationFrame(this.draw);
    // }

    // drawCursor = () => {
    //     this.objects.forEach((obj) => {
    //         if (
    //             this.mouse.x > obj.coord.x - obj.radius &&
    //             this.mouse.x < obj.coord.x + obj.radius &&
    //             this.mouse.y > obj.coord.y - obj.radius &&
    //             this.mouse.y < obj.coord.y + obj.radius
    //         ) {
    //             this.canvas.style.cursor = "crosshair";
    //         } else {
    //             this.canvas.style.cursor = "auto";
    //         }
    //     });
    // };

    // draw = () => {
    //     this.ctx.clearRect(0, 0, this.width, this.height);
    //     this.drawCursor();

    //     this.boss.draw(this.hero);
    //     this.hero.draw(this.objects);
    //     if (!this.end) {
    //         requestAnimationFrame(this.draw);
    //     } else {
    //         this.ctx.clearRect(0, 0, this.width, this.height);
    //         this.canvas.style.cursor = "auto";

    //         let gameOptions = document.querySelector(".game");
    //         let gameEnd = document.querySelector(".game__end");
    //         gameOptions.classList.remove("game--hide");
    //         gameEnd.classList.remove("game__end--hide");
    //     }

    // if (this.boss.curHp <= 0) {
    //     this.objects.pop();
    //     this.end = true;
    // }

    // if (this.hero.curHp <= 0) {
    //     this.end = true;
    // }
    // };
}

export const game = new Game();
