import { Hero } from "../hero";
import { Bullet } from "./spells";
import { config } from "../../config";

const configHero = {
    mainColor: "#f72743",
};

export class Mage extends Hero {
    color = configHero.mainColor;
    vel = 5;
    maxHp = 400;
    curHp = 200;

    bullets = [];
    bulletsCountMax = 10;
    bulletsCount = this.bulletsCountMax;
    gunReady = true;
    speedReload = 0;

    useBlast = false;
    blastRadius = this.radius + 6;

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
        // this.ctx.beginPath();
        // this.ctx.strokeStyle = color;
        // this.ctx.lineWidth = 6;
        // this.ctx.moveTo(this.coord.x, this.coord.y);
        // this.ctx.lineTo(x, y);
        // this.ctx.stroke();
        // this.ctx.closePath();

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

            if (this.bulletsCount === 0) {
                this.gunReady = false;
            }
        }
    };

    //сделать рефакторинг
    gunMechanic = () => {
        if (!this.gunReady) {
            this.speedReload += 5;
            if (this.speedReload === 50) {
                this.bulletsCount += 1;
                this.speedReload = 0;
            }

            if (this.bulletsCount === this.bulletsCountMax) {
                this.gunReady = true;
            }
        }

        for (let i = 0; i < this.bulletsCount; i++) {
            let x = (this.radius + 20) * Math.cos((i + 1) * (config.TWO_PI / this.bulletsCountMax));
            let y = (this.radius + 20) * Math.sin((i + 1) * (config.TWO_PI / this.bulletsCountMax));

            this.createReloadClip(this.coord.x + x, this.coord.y - y, "#f1f1f1");
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
        window.addEventListener("keydown", this.useSpell);
    }

    draw() {
        super.draw();
        this.gunMechanic();

        this.bullets.forEach((bullet) => {
            bullet.draw();
            if (bullet.finish) {
                this.bullets = this.bullets.filter((item) => !item.finish);
            }
        });
        this.blast();
    }
}
