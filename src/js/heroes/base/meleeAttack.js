export class MeleeAttack {
    finish = false;

    constructor(coord, mouse, ctx) {
        this.ctx = ctx;
        this.mouse = { x: mouse.x, y: mouse.y };
        this.coord = coord;
        this.angle = { x: coord.x + 60, y: coord.y + 60 };
    }

    createWeapon = () => {
        this.ctx.beginPath();
        this.ctx.moveTo(this.coord.x, this.coord.y);
        this.ctx.lineTo(this.angle.x, this.angle.y);
        this.ctx.stroke();
        this.ctx.closePath();
    };

    moveWeapon = () => {
        let angleX = Math.cos(2 * Math.PI);
        let angleY = Math.sin(2 * Math.PI);

        this.angle.x += this.angle.x * angleX;
        this.angle.y += this.angle.y * angleY;
    };

    damage = (obj, damage) => {
        obj.forEach((object) => {
            let delta = { x: object.coord.x - this.coord.x, y: object.coord.y - this.coord.y };
            let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

            if (object.shield) {
                if (dist <= object.shieldRadius) {
                    object.shield -= damage;
                    this.finish = true;
                }
            } else {
                if (dist < object.radius) {
                    object.curHp -= damage;
                    this.finish = true;
                }
            }
        });
    };

    draw = () => {
        this.createWeapon();
        this.moveWeapon();
    };
}
