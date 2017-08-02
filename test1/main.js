var cnavas,
    ctx,
    width,
    height;
var animation,
    lastTime = 0,
    Timesub = 0, // delta Time
    DeltaTime = 0,
    loop = true;
var ctx_font = "Consolas",
    ctx_fontsize = 10,
    ctx_backColor = "#777";

window.onload = function () {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    main();
}

var shapes = [];

function main() {
    console.log("start");

    shapes.push(new Shape_Rect(0, 0, 200, 100));

    window.requestAnimationFrame(mainLoop);
    //mainLoop();
}


function update(dt) {
    for (let i = 0; i < shapes.length; i++) {
        let obj = shapes[i];
        ctx.fillStyle = "#FFF";
        obj.update(dt);
    }
}

function draw(ctx) {
    for (let i = 0; i < shapes.length; i++) {
        let obj = shapes[i];
        obj.draw(ctx);
    }
}

function mainLoop(timestamp) {
    Timesub = timestamp - lastTime;// get sleep
    DeltaTime = Timesub / 1000;
    lastTime = timestamp;
    //Clear
    ctx.fillStyle = ctx_backColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //--------Begin-----------

    update(DeltaTime);
    draw(ctx);

    //--------End---------------
    let str1 = "Fps: " + 1000 / Timesub, str2 = "Timesub: " + Timesub, str3 = "DeltaTime: " + DeltaTime;
    drawString(ctx, str1 + "\n" + str2 + "\n" + str3,
        0, height - 31,
        "#FFF", 10, "consolas",
        0, 0, 0);
    if (loop) {
        animation = window.requestAnimationFrame(mainLoop);
    } else {
        // over
    }
}

//--------object-------------
function Shape_Rect(x, y, w, h) {
    this.pos = new Vector(x, y);// center
    this.w = w;
    this.h = h;
    
    this.directionAngle = 0;
    this.rotateSpeed = 0.1;

    this.speed = new Vector(1, 0);
    this.speed.setLength(20);
    this.speed.setAngleDeg(45);
}
Shape_Rect.prototype.update = function (dt) {
    this.directionAngle += this.rotateSpeed * dt;

    let nowSpeed = this.speed.clone().multiplyScalar(dt);
    this.pos.add(nowSpeed);
}
Shape_Rect.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.directionAngle);

    ctx.fillRect(- this.w / 2, - this.h / 2, this.w, this.h);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(- this.w / 2, - this.h / 2, this.w, this.h);

    ctx.restore();
}


// ----tool-------
function drawCircle(x, y, r, side) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 1;
    if (side) ctx.stroke();
}
function toRadio(angle) {
    return angle * Math.PI / 180;
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function random(min, max) {
    return Math.random() * (max - min) + min;
}