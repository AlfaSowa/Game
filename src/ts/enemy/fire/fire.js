import { BaseBossClass } from "../base/baseBossClass";
import { VoidZone } from "./spells/voidZone";
import { createCurrentValue } from "../../engine/engine";

let config = {
    voidZoneCount: 900,
    voidZoneCountShow: 300,
};

export class Fire extends BaseBossClass {
    voidZoneCount = config.voidZoneCount;
    voides = [];

    crash = true;

    constructor(opt) {
        super(opt);
    }

    createvoidZone = (hero) => {
        if (this.voidZoneCount < config.voidZoneCountShow) {
            createCurrentValue(
                hero.coord.x,
                hero.coord.y,
                hero.radius + 10,
                config.voidZoneCountShow,
                this.voidZoneCount,
                "#9c50ff",
                4
            );
        }

        if (this.voidZoneCount <= 0) {
            this.voides.push(new VoidZone({ coord: hero.coord }));
            this.voidZoneCount = config.voidZoneCount;
        } else {
            this.voidZoneCount -= 1;
        }
    };

    draw(hero) {
        super.draw(hero);
        this.createvoidZone(hero);

        this.voides.map((voidZone) => voidZone.draw(this, hero));

        if (this.shield < this.maxShield / 2 && this.crash) {
            this.voides.forEach((item) => {
                item.crash = true;
            });

            this.crash = false;
        }
    }
}
