import { BaseHeroClass } from "../base/baseHeroClass";
import { Blast } from "./spells/blast";

export class Mage extends BaseHeroClass {
    typeAttack = "range";
    constructor(opt) {
        super(opt);
    }

    // useSpell = (e) => {
    //     switch (e.keyCode) {
    //         case 87:
    //             super.baseAttack();
    //             break;
    //     }
    // };
}
