import { createFillCircle, createStrokeCircle, createCurrentValue } from "../../engine/engine";

export class BaseBossClass {
    coord = { x: innerWidth / 2, y: 130 };
    radius = 100;
    color = "#6f1b4e";
    maxHp = 500;
    curHp = this.maxHp;
    speed = 1;

    maxShield = 300;
    shield = this.maxShield;
    shieldRadius = this.radius + 20;
    shieldColor = "#0d9ad0";

    constructor(opt) {}

    init() {}

    draw() {
        createFillCircle(this.coord.x, this.coord.y, this.radius, this.color);
        createStrokeCircle(this.coord.x, this.coord.y, this.radius, "rgba(255,255,255,0.1)", 10);
        createCurrentValue(this.coord.x, this.coord.y, this.radius, this.maxHp, this.curHp, "#fff", 10);

        if (this.shield <= 0) {
            this.shield = false;
        }
        if (this.shield) {
            createStrokeCircle(this.coord.x, this.coord.y, this.shieldRadius, "rgba(13,154,208,0.1");
            createCurrentValue(this.coord.x, this.coord.y, this.shieldRadius, this.maxShield, this.shield, this.shieldColor, 4);
        }
    }
}
