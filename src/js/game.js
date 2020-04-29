import { Map } from "./map/map";
import { config } from "./config";
let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");

let options = document.querySelector(".options");
let optionsShow = options.querySelector(".options__show");
let btnStart = options.querySelector(".options__btn");

class Game {
    constructor() {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = this.canvas.width = config.canvasWidth;
        this.height = this.canvas.height = config.canvasHeight;
        this.start = false;

        this.mouse = {
            x: this.width / 2,
            y: this.height / 2,
            down: false,
        };
    }

    init = () => {
        this.canvas.addEventListener("mousemove", this.setPos);
        window.addEventListener("mousedown", this.isDown);
        window.addEventListener("mouseup", this.isDown);

        this.map = new Map({
            ctx: this.ctx,
            mouse: this.mouse,
        });
        this.map.init();

        requestAnimationFrame(this.draw);
    };

    setPos = ({ layerX, layerY }) => {
        [this.mouse.x, this.mouse.y] = [layerX, layerY];
    };

    isDown = () => {
        this.mouse.down = !this.mouse.down;
    };

    draw = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.map.draw();
        requestAnimationFrame(this.draw);
    };
}

const game = new Game();
btnStart.addEventListener("click", () => {
    options.classList.add("options--hide");
    if (!game.start) {
        game.init();
        game.start = true;
    }
});
optionsShow.addEventListener("click", () => {
    options.classList.toggle("options--hide");
});
