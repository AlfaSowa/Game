import { RangeAttack } from "./rangeAttack";
import { MeleeAttack } from "./meleeAttack";

export class BaseHeroClass {
    target = { x: 500, y: 500 };
    coord = { x: 500, y: 500 };

    mass = 1;
    vel = 7;
    radius = 50;
    color = "red";
    maxHp = 400;
    curHp = 0;

    typeAttack = false;
    heroDamage = 5;

    attaks = [];

    aoeRangeCheck = false;
    aoeRadius = 0;

    isUseSpell = false;

    constructor(opt) {
        this.canvas = opt.canvas;
        this.ctx = opt.ctx;
        this.mouse = opt.mouse;
    }

    //create
    createCircle(x, y, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
    }

    createStrokeCircle(x, y, radius) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#fff";
        this.ctx.lineJoin = "none";
        this.ctx.lineWidth = 2;
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    createCurHp = (x, y, radius) => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#e4e4e4";
        this.ctx.lineJoin = "none";
        this.ctx.lineWidth = 2;
        this.ctx.arc(x, y, radius, 0, ((2 * Math.PI) / 100) * ((100 / this.maxHp) * this.curHp));
        this.ctx.stroke();
        this.ctx.closePath();
    };

    //move
    getTarget = () => {
        this.target = { x: this.mouse.x, y: this.mouse.y };
    };
    toMouseCoordMove = () => {
        if (!this.isUseSpell) {
            if (this.coord.x != this.target.x || this.coord.y != this.target.y) {
                let delta = { x: this.target.x - this.coord.x, y: this.target.y - this.coord.y };
                let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

                if (dist <= this.vel) {
                    this.coord.x = this.target.x;
                    this.coord.y = this.target.y;
                } else {
                    this.coord.x += ((this.vel * delta.x) / dist) * this.mass;
                    this.coord.y += ((this.vel * delta.y) / dist) * this.mass;
                }
            }
        }
    };

    //base attack
    baseAttack() {
        if (this.typeAttack == "range") {
            let delta = { x: this.mouse.x - this.coord.x, y: this.mouse.y - this.coord.y };
            let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

            this.attaks.push(new RangeAttack(this.coord, this.mouse, this.ctx, dist * 0.04));
        } else if (this.typeAttack == "melee") {
            this.attaks.push(new MeleeAttack(this.coord, this.mouse, this.ctx));
        }
    }

    drawAttack = (obj) => {
        this.attaks.forEach((attack) => {
            attack.draw();

            attack.damage(obj, this.heroDamage);
            if (attack.finish) {
                this.attaks = this.attaks.filter((item) => !item.finish);
            }
        });
    };

    //aoe range
    aoeRange() {
        if (this.aoeRangeCheck) {
            this.createStrokeCircle(this.mouse.x, this.mouse.y, this.aoeRadius);
        }
    }

    init() {
        window.addEventListener("mousedown", this.getTarget);
        window.addEventListener("keydown", this.useSpell);
        this.curHp = this.maxHp;
    }

    draw(obj) {
        if (this.curHp > 0) {
            this.toMouseCoordMove();

            this.drawAttack(obj);
            this.aoeRange();

            this.createCircle(this.coord.x, this.coord.y, this.radius, this.color);
            this.createStrokeCircle(this.coord.x, this.coord.y, this.radius);
            this.createCurHp(this.coord.x, this.coord.y, this.radius);
        }
    }
}
