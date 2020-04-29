import { config } from "../config";

const configHero = {
    mainColor: "#f72743",
};

class Bullet {
    radius = 5;
    finish = false;

    constructor(coord, mouse, ctx) {
        this.ctx = ctx;
        this.coord = { x: coord.x, y: coord.y };
        this.mouse = { x: mouse.x, y: mouse.y };
    }

    draw = () => {
        this.ctx.fillStyle = "#fff";
        this.ctx.beginPath();
        this.ctx.arc(this.coord.x, this.coord.y, this.radius, 0, config.TWO_PI);
        this.ctx.closePath();
        this.ctx.fill();

        if (this.coord.x != this.mouse.x || this.coord.y != this.mouse.y) {
            let delta = { x: this.mouse.x - this.coord.x, y: this.mouse.y - this.coord.y };
            let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

            if (dist <= 9) {
                this.finish = true;
            } else {
                this.coord.x += (9 * delta.x) / dist;
                this.coord.y += (9 * delta.y) / dist;
            }
        }
    };
}

export class Hero {
    color = configHero.mainColor;
    target = { x: 500, y: 500 };
    vel = 5;
    slow = false;
    maxHp = 400;
    curHp = 200;
    coord = { x: 500, y: 500 };
    mass = 1;
    radius = 25;

    bullets = [];
    bulletsCount = 5;
    gunReady = true;
    speedReload = 0;

    useBlast = false;
    blastRadius = this.radius + 6;
    testCircleColor = "red";

    constructor(opt) {
        this.ctx = opt.ctx;
        this.mouse = opt.mouse;
    }

    getTarget = () => {
        this.target = { x: this.mouse.x, y: this.mouse.y };
    };

    createCircle = (x, y, radius, color) => {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, config.TWO_PI);
        this.ctx.closePath();
        this.ctx.font = "130px Arial";
        this.ctx.fillText(`${this.bulletsCount}`, this.coord.x, this.coord.y);
        this.ctx.fill();
    };

    createStrokeCircle = (x, y, radius, color, lineWidth) => {
        this.ctx.strokeStyle = color;
        this.ctx.lineJoin = "none";
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, config.TWO_PI);
        this.ctx.stroke();
        this.ctx.closePath();
    };

    createCurHp = (x, y, radius) => {
        this.ctx.strokeStyle = "#e4e4e4";
        this.ctx.lineJoin = "none";
        this.ctx.lineWidth = this.stroke;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, config.TWO_PI / 3);
        this.ctx.stroke();
        this.ctx.closePath();
    };

    toMouseCoordMove = () => {
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
    };

    getSlow = () => {
        if (this.slow) {
            this.color = "#066fb1";
            this.mass = (1 / 100) * 20;
        } else {
            this.color = configHero.mainColor;
            this.mass = 1;
        }
    };

    blast = () => {
        this.testCircleColor = "red";
        if (this.useBlast) {
            if (this.blastRadius < 200) {
                this.createStrokeCircle(this.coord.x, this.coord.y, this.blastRadius, "red", 2);

                let delta = { x: 700 - this.coord.x, y: 500 - this.coord.y };
                let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

                if (dist - 20 <= this.blastRadius) {
                    this.testCircleColor = "yellow";
                }
                this.blastRadius += 0.5;
            } else {
                this.useBlast = false;
                this.blastRadius = this.radius + 6;
            }
        }
    };

    fireFromGun = () => {
        if (this.gunReady) {
            this.bulletsCount -= 1;
            this.bullets.push(new Bullet(this.coord, this.mouse, this.ctx));

            if (this.bulletsCount === 0) {
                this.gunReady = false;
            }
        }
    };

    gunMechanic = () => {
        if (!this.gunReady) {
            this.speedReload += 1;
            if (this.speedReload === 50) {
                this.bulletsCount += 1;
                this.speedReload = 0;
            }

            if (this.bulletsCount === 5) {
                this.gunReady = true;
            }
        }
    };

    useSpell = (e) => {
        if (e.key === "w" || e.key === "W") {
            this.fireFromGun();
        } else if (e.key === "e" || e.key === "E") {
            this.useBlast = true;
        }
    };

    init = () => {
        window.addEventListener("mousedown", this.getTarget);
        window.addEventListener("keydown", this.useSpell);
    };

    testCircle = () => {
        this.createStrokeCircle(700, 500, 20, this.testCircleColor, 2);
    };

    draw = () => {
        this.getSlow();
        this.toMouseCoordMove();
        this.createCircle(this.coord.x, this.coord.y, this.radius, this.color);

        this.createStrokeCircle(this.coord.x, this.coord.y, this.radius, "#404040", this.radius / 3);
        this.createCurHp(this.coord.x, this.coord.y, this.radius, this.curHp);

        this.testCircle();

        this.gunMechanic();

        this.bullets.forEach((bullet) => {
            bullet.draw();
            if (bullet.finish) {
                this.bullets = this.bullets.filter((item) => !item.finish);
            }
        });

        this.blast();
    };
}
