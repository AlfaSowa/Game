import { Enemy } from "./enemy";

export class Robot extends Enemy {
    constructor(options) {
        super(options);
    }

    draw = (x, y) => {
        this.createCircle(300, 50, 20, "green");
    };
}
