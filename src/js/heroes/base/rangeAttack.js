import { createFillCircle } from "../../engine/engine";

const random = (min, max) => Math.random() * (max - min) + min;

export class RangeAttack {
    radius = 8;
    finish = false;
    vel = 10;
    color = "#0081dc";

    objectDamageCoord = false;

    bubble = false;
    bubbleRadius = random(1, 5);
    bubbleLive = 1;
    bubbleFading = random(0.1, 0.02);

    constructor(coord, mouse, spread) {
        this.mouse = { x: mouse.x + random(-spread, spread), y: mouse.y + random(-spread, spread) };
        this.coord = { x: coord.x, y: coord.y };
    }

    moveBullet = () => {
        if (this.coord.x != this.mouse.x || this.coord.y != this.mouse.y) {
            let delta = { x: this.mouse.x - this.coord.x, y: this.mouse.y - this.coord.y };
            let angle = Math.atan2(delta.y, delta.x);

            if (this.coord.x > 0 && this.coord.x < innerWidth && this.coord.y > 0 && this.coord.y < innerHeight) {
                this.coord.x += Math.cos(angle) * this.vel;
                this.coord.y += Math.sin(angle) * this.vel;
                this.mouse.x += Math.cos(angle) * this.vel;
                this.mouse.y += Math.sin(angle) * this.vel;
            } else {
                this.finish = true;
            }
        }
    };

    createBubble = () => {
        let delta = { x: this.objectDamageCoord.x - this.coord.x, y: this.objectDamageCoord.y - this.coord.y };
        let angle = Math.atan2(delta.y, delta.x);

        this.coord.x -= Math.cos(angle) * 2;
        this.coord.y -= Math.sin(angle) * 2;

        createFillCircle(this.coord.x, this.coord.y, this.bubbleRadius, `rgba(64, 198, 249, ${this.bubbleLive})`);

        this.bubbleLive -= this.bubbleFading;
        if (this.bubbleLive <= 0) {
            this.finish = true;
        }
    };

    collisionWithObject = (objects, heroDamage) => {
        objects.forEach((object) => {
            let delta = { x: object.coord.x - this.coord.x, y: object.coord.y - this.coord.y };
            let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

            if (object.shield) {
                if (dist <= object.shieldRadius + this.radius) {
                    this.bubble = true;
                    this.objectDamageCoord = { x: object.coord.x, y: object.coord.y };
                    object.shield -= heroDamage;
                }
            } else {
                if (dist < object.radius + this.radius) {
                    this.finish = true;
                    object.curHp -= heroDamage;
                }
            }
        });
    };

    draw = (objects, heroDamage) => {
        if (!this.bubble) {
            createFillCircle(this.coord.x, this.coord.y, this.radius, this.color);
            this.moveBullet();
            this.collisionWithObject(objects, heroDamage);
        } else {
            this.createBubble();
        }
    };
}
