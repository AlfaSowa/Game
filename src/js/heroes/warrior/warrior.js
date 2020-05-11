import { BaseHeroClass } from "../base/baseHeroClass";

export class Warrior extends BaseHeroClass {
    radius = 40;
    color = "orange";
    mass = 0.6;
    maxHp = 1000;
    typeAttack = "melee";

    constructor(opt) {
        super(opt);
    }
}
