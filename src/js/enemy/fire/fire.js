import { BaseBossClass } from "../base/baseBossClass";
import { VoidZone } from "./spells/voidZone";
import { createCurrentValue } from "../../engine/engine";

let config = {
    voidZoneCount: 2000,
    voidZoneCountShow: 300,
};

export class Fire extends BaseBossClass {
    //лужа 1 типа
    voidZoneCount = config.voidZoneCount;
    voides = [];

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
    }
}
