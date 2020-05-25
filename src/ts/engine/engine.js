const PI2 = 2 * Math.PI;
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

export const createFillCircle = (x, y, radius, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, PI2);
    ctx.closePath();
    ctx.fill();
};

export const createStrokeCircle = (x, y, radius, color = "rgba(255,255,255,0.1)", lineWidth = 2) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineJoin = "none";
    ctx.lineWidth = lineWidth;
    ctx.arc(x, y, radius, 0, PI2);
    ctx.stroke();
    ctx.closePath();
};

export const createCurrentValue = (x, y, radius, maxValue, curValue, color = "#fff", lineWidth = 2) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineJoin = "none";
    ctx.lineWidth = lineWidth;
    ctx.arc(x, y, radius, 0, (PI2 / 100) * ((100 / maxValue) * curValue));
    ctx.stroke();
    ctx.closePath();
};
