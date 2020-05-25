import { Hero } from "../hero";
import { Bullet, GhostBullet } from "./spells";
import { config } from "../../config";

const configHero = {
    mainColor: "#f72743",
};

const random = (min, max) => Math.random() * (max - min) + min;

export class Mage extends Hero {
    color = configHero.mainColor;
    vel = 5;
    bullets = [];
    bulletsCountMax = 10;
    bulletsCount = this.bulletsCountMax;
    gunReady = true;
    speedReload = 0;

    useBlast = false;
    blastRadius = this.radius + 6;

    ghostBullets = [];

    radiusFromCenterHero = this.radius + 100;

    constructor(opt) {
        super(opt);
    }

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

    createReloadClip = (x, y, color) => {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 5, 0, config.TWO_PI);
        this.ctx.closePath();
        this.ctx.fill();
    };

    fireFromGun = () => {
        if (this.gunReady && this.coord.x !== this.mouse.x) {
            this.bulletsCount -= 1;
            this.bullets.push(new Bullet(this.coord, this.mouse, this.ctx));
            this.ghostBullets.pop();

            if (this.bulletsCount === 0) {
                this.gunReady = false;
            }
        }
    };

    ghostBulletRide = (x, y, finalX, finalY, i) => {
        let delta = { x: finalX - x, y: finalY - y };
        let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

        if (dist <= 10) {
            this.createReloadClip(finalX, finalY, "green");
        } else {
            this.createReloadClip(x, y, "#f1f1f1");

            this.ghostBullets[i].x += (10 * delta.x) / dist;
            this.ghostBullets[i].y += (10 * delta.y) / dist;
        }
    };

    createBullet = (i) => {
        let angleX = Math.cos(i * (Math.PI / this.bulletsCountMax) + 0.15);
        let angleY = Math.sin(i * (Math.PI / this.bulletsCountMax) + 0.15);

        let finalX = this.coord.x + (this.radius + 20) * angleX;
        let finalY = this.coord.y + (this.radius + 20) * angleY;

        let x, y;

        if (this.ghostBullets[i].x === 0 && this.ghostBullets[i].y === 0) {
            this.createReloadClip(finalX, finalY, "green");
        } else {
            x = this.coord.x + this.radiusFromCenterHero * angleX + this.ghostBullets[i].x;
            y = this.coord.y + this.radiusFromCenterHero * angleY + this.ghostBullets[i].y;

            this.ghostBulletRide(x, y, finalX, finalY, i);
        }
    };

    createUlty = (i) => {
        let angleX = Math.cos(i * (-Math.PI / 10) - 0.15);
        let angleY = Math.sin(i * (-Math.PI / 10) - 0.15);

        let finalX = this.coord.x + (this.radius + 20) * angleX;
        let finalY = this.coord.y + (this.radius + 20) * angleY;

        this.createReloadClip(finalX, finalY, "magenta");
    };

    gunMechanic = () => {
        if (!this.gunReady) {
            this.speedReload += 5;
            if (this.speedReload === 50) {
                this.bulletsCount += 1;
                this.speedReload = 0;
                this.ghostBullets.push({ x: random(-20, 20), y: random(-20, 20) });
            }

            if (this.bulletsCount === this.bulletsCountMax) {
                this.gunReady = true;
            }
        }

        for (let i = 0; i < this.ghostBullets.length; i++) {
            this.createBullet(i);
        }

        for (let i = 0; i < 3; i++) {
            this.createUlty(i);
        }
    };

    useSpell = (e) => {
        switch (e.keyCode) {
            case 87:
                this.fireFromGun();
                break;
            case 69:
                this.useBlast = true;
                break;
        }
    };

    init() {
        super.init();
        for (let i = 0; i < this.bulletsCountMax; i++) {
            this.ghostBullets.push({ x: 0, y: 0 });
        }
        for (let i = 0; i < this.ghostBullets.length; i++) {
            this.createBullet(i);
        }

        window.addEventListener("keydown", this.useSpell);
    }

    draw(obj) {
        super.draw();

        if (this.curHp > 0) {
            this.gunMechanic();

            this.bullets.forEach((bullet) => {
                bullet.draw();
                bullet.damage(obj);
                if (bullet.finish) {
                    this.bullets = this.bullets.filter((item) => !item.finish);
                }
            });

            this.blast();
        }
    }
}
