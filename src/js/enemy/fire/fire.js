import { BaseBossClass } from "../base/baseBossClass";

export class Fire extends BaseBossClass {
    color = "green";

    shield = 100;

    constructor(opt) {
        super(opt);
    }
}
