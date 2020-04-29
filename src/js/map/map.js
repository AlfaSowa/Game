import { Hero } from "../hero/hero";
import { Boss } from "../enemy/boss/boss";
import { config } from "../config";

export class Map {
    constructor(options) {
        this.ctx = options.ctx;
        this.mouse = options.mouse;
    }

    init = () => {
        this.boss = new Boss({
            ctx: this.ctx,
            x: config.canvasWidth / 2,
            y: 0,
            radius: 300,
        });

        this.hero = new Hero({
            ctx: this.ctx,
            mouse: this.mouse,
            radius: 35,
        });

        this.boss.init();
        this.hero.init();
    };

    draw = () => {
        this.boss.draw(this.hero);
        this.hero.draw();
    };
}
