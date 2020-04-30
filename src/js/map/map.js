import { Boss } from "../enemy/boss/boss";
import { config } from "../config";
import { Mage } from "../hero/mage/mage";

export class Map {
    constructor(options) {
        this.ctx = options.ctx;
        this.mouse = options.mouse;
    }

    init = () => {
        // this.boss = new Boss({
        //     ctx: this.ctx,
        //     x: config.canvasWidth / 2,
        //     y: 0,
        //     radius: 300,
        // });

        this.mage = new Mage({
            ctx: this.ctx,
            mouse: this.mouse,
            radius: 35,
        });

        // this.boss.init();
        this.mage.init();
    };

    draw = () => {
        // this.boss.draw(this.mage);
        this.mage.draw();
    };
}
