import { RangeAttack } from "./rangeAttack";
import { MeleeAttack } from "./meleeAttack";
import { createFillCircle, createStrokeCircle, createCurrentValue } from "../../engine/engine";

export class BaseHeroClass {
    target = { x: innerWidth / 2, y: innerHeight - 200 };
    coord = { x: innerWidth / 2, y: innerHeight - 200 };

    vel = 5;
    radius = 35;
    color = "#2e94dc";
    maxHp = 400;
    curHp = this.maxHp;

    typeAttack = false;
    heroDamage = 5;

    attaks = [];

    keyW = false;
    keyA = false;
    keyS = false;
    keyD = false;

    dashCd = 0;
    dashDuration = 0;
    dashToForward = false;

    constructor(opt) {
        this.canvas = opt.canvas;
        this.ctx = opt.ctx;
        this.mouse = opt.mouse;
    }

    //move
    getTarget = () => {
        this.target = { x: this.mouse.x, y: this.mouse.y };
    };

    toMouseCoordMove = () => {
        if (this.coord.x != this.target.x || this.coord.y != this.target.y) {
            let delta = { x: this.target.x - this.coord.x, y: this.target.y - this.coord.y };
            let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

            if (dist <= this.vel) {
                this.coord.x = this.target.x;
                this.coord.y = this.target.y;
            } else {
                this.coord.x += (this.vel * delta.x) / dist;
                this.coord.y += (this.vel * delta.y) / dist;
            }
        }
    };

    dash = () => {
        if (this.dashCd > 0) {
            this.dashCd -= 0.1;
        }

        if (this.dashToForward) {
            this.dashToForward = false;
            this.dashDuration = 10;
            this.vel = 20;
            this.dashCd = 10;
        }

        if (this.dashDuration > 0) {
            this.dashDuration -= 1;
        }
        if (this.dashDuration <= 0) {
            this.vel = 5;
        }
    };

    onKeyDown = (e) => {
        switch (e.keyCode) {
            case 68: //d
                this.keyD = true;
                break;
            case 83: //s
                this.keyS = true;
                break;
            case 65: //a
                this.keyA = true;
                break;
            case 87: //w
                this.keyW = true;
                break;
            case 32: //space
                if (this.dashCd <= 0) {
                    this.dashToForward = true;
                }
                break;
        }
    };

    onKeyUp = (e) => {
        switch (e.keyCode) {
            case 68: //d
                this.keyD = false;
                break;
            case 83: //s
                this.keyS = false;
                break;
            case 65: //a
                this.keyA = false;
                break;
            case 87: //w
                this.keyW = false;
                break;
        }
    };

    drawStuff = () => {
        if (
            this.coord.x >= this.radius &&
            this.coord.x <= innerWidth - this.radius &&
            this.coord.y >= this.radius &&
            this.coord.y <= innerHeight - this.radius
        ) {
            if (this.keyD == true) {
                this.coord.x += this.vel;
            }
            if (this.keyS == true) {
                this.coord.y += this.vel;
            }
            if (this.keyA == true) {
                this.coord.x -= this.vel;
            }
            if (this.keyW == true) {
                this.coord.y -= this.vel;
            }
        }

        if (this.coord.x < this.radius + 5) {
            this.coord.x = this.radius + 5;
        }
        if (this.coord.x > innerWidth - (this.radius + 5)) {
            this.coord.x = innerWidth - (this.radius + 5);
        }
        if (this.coord.y < this.radius + 5) {
            this.coord.y = this.radius + 5;
        }
        if (this.coord.y > innerHeight - (this.radius + 5)) {
            this.coord.y = innerHeight - (this.radius + 5);
        }
    };

    //attack
    baseAttack = () => {
        this.getTarget();
        if (this.typeAttack == "range") {
            let delta = { x: this.mouse.x - this.coord.x, y: this.mouse.y - this.coord.y };
            let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

            this.attaks.push(new RangeAttack(this.coord, this.mouse, dist * 0.04));
        } else if (this.typeAttack == "melee") {
            this.attaks.push(new MeleeAttack(this.coord, this.mouse, this.ctx));
        }
    };

    drawAttack = (objects) => {
        this.attaks.forEach((attack) => {
            attack.draw(objects, this.heroDamage);

            if (attack.finish) {
                this.attaks = this.attaks.filter((item) => !item.finish);
            }
        });
    };

    //base
    init() {
        window.addEventListener("mousedown", this.baseAttack);
        window.addEventListener("keydown", this.onKeyDown, false);
        window.addEventListener("keyup", this.onKeyUp, false);
        this.curHp = this.maxHp;
    }

    draw(objects) {
        if (this.curHp > 0) {
            // this.toMouseCoordMove();
            this.dash();
            this.drawStuff();

            this.drawAttack(objects);
            createFillCircle(this.coord.x, this.coord.y, this.radius, this.color);
            createStrokeCircle(this.coord.x, this.coord.y, this.radius, "rgba(255,255,255,0.1)", 7);
            createCurrentValue(this.coord.x, this.coord.y, this.radius, this.maxHp, this.curHp, "#fff", 7);
        }
    }
}
