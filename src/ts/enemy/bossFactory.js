import { Fire } from "./fire/fire";
import { Ice } from "./ice/ice";

export class BossFactory {
    static bosses = {
        fire: Fire,
        ice: Ice,
    };

    constructor(opt) {
        this.canvas = opt.canvas;
        this.ctx = opt.ctx;
    }

    createBoss = (name) => {
        const GetBoss = BossFactory.bosses[name];
        const boss = new GetBoss({
            canvas: this.canvas,
            ctx: this.ctx,
        });
        console.log(boss);

        return boss;
    };
}
