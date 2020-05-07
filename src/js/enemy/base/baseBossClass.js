export class BaseBossClass {
    coord = { x: 150, y: 150 };
    radius = 100;
    color = "red";
    maxHp = 400;
    curHp = this.maxHp;

    maxShield = 100;
    shield = false;
    shieldRadius = 0;
    shieldColor = "#0d9ad0";

    constructor(opt) {
        this.ctx = opt.ctx;
    }

    createCircle = (x, y, radius, color) => {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
    };

    createStrokeCircle = (x, y, radius, color = "rgba(255,255,255,0.1)", lineWidth = 2) => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineJoin = "none";
        this.ctx.lineWidth = lineWidth;
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
    };

    showCurrentValue = (x, y, radius, maxValue, curValue, color = "#fff", lineWidth = 2) => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineJoin = "none";
        this.ctx.lineWidth = lineWidth;
        this.ctx.arc(x, y, radius, 0, ((2 * Math.PI) / 100) * ((100 / maxValue) * curValue));
        this.ctx.stroke();
        this.ctx.closePath();
    };

    init() {
        this.shieldRadius = this.radius + 20;
    }

    draw() {
        this.createCircle(this.coord.x, this.coord.y, this.radius, this.color);
        this.createStrokeCircle(this.coord.x, this.coord.y, this.radius, "rgba(255,255,255,0.1)", 5);
        this.showCurrentValue(this.coord.x, this.coord.y, this.radius, this.maxHp, this.curHp, "#fff", 5);
        if (this.shield) {
            this.createStrokeCircle(this.coord.x, this.coord.y, this.shieldRadius, "rgba(13,154,208,0.1");
            this.showCurrentValue(
                this.coord.x,
                this.coord.y,
                this.shieldRadius,
                this.maxShield,
                this.shield,
                this.shieldColor,
                4
            );
        }
    }
}
