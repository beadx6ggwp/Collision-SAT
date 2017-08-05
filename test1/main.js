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

    document.addEventListener("mousedown", mousedown, false);
    document.addEventListener("mouseup", mouseup, false);
    document.addEventListener("mousemove", mousemove, false);

    main();
}

// mouse
var mousePos, isDown = false;
var dragPoint, offSet;
var slide = {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
    startTime: 0,
    endTime: 0,
    getDeltaVel: function (max) {
        let vec = new Vector(this.end.x - this.start.x,
            this.end.y - this.start.y);

        vec.divideScalar((this.endTime - this.startTime) / 1000);
        if (vec.lengthSq() > max * max && max) vec.setLength(max);
        return vec;
    }
};

// shaped
var shapes = [], num = 2;

function main() {
    console.log("start");

    for (let i = 0; i < num; i++) {
        let obj = new Shape_Rect(randomInt(0, width), randomInt(0, height),
            randomInt(100, 200), randomInt(100, 200),
            randomInt(100, 200), randomInt(0, 360));
        obj.rotateSpeed = toRadio(randomInt(-90, 90));
        shapes.push(obj);
    }

    window.requestAnimationFrame(mainLoop);
    //mainLoop();
}


function update(dt) {
    if (isDown) {
        //update
        dragPoint.pos.x = mousePos.x - offSet.x;
        dragPoint.pos.y = mousePos.y - offSet.y;
    }

    for (let i = 0; i < shapes.length; i++) {
        let obj = shapes[i];
        ctx.fillStyle = "#FFF";
        obj.update(dt);
    }
}

function draw(ctx) {
    for (let i = 0; i < shapes.length; i++) {
        let obj = shapes[i];
        ctx.save();

        if (isDown && obj === dragPoint) {
            ctx.shadowColor = "#000";
            ctx.shadowOffsetX = 4;
            ctx.shadowOffsetY = 4;
            ctx.shadowBlur = 8;
        }

        obj.draw(ctx);

        drawString(ctx, i + "",
            obj.pos.x, obj.pos.y,
            "#000", 10, "consolas",
            0, 0, 0);

        ctx.restore();
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

function mousedown(e) {
    dragPoint = findDragPoint(e.clientX, e.clientY);
    if (dragPoint) {
        slide.start = mousePos;
        slide.startTime = getNow();

        isDown = true;
        offSet = {
            x: mousePos.x - dragPoint.pos.x,
            y: mousePos.y - dragPoint.pos.y
        };
        let index = shapes.indexOf(dragPoint);
        shapes.push(shapes[index]);
        shapes.splice(index, 1);
    }
}

function mouseup(e) {
    isDown = false;
    if (dragPoint) {
        slide.end = mousePos;
        slide.endTime = getNow();
        dragPoint.vel = slide.getDeltaVel(1000);
    }
}

function mousemove(e) {
    mousePos = { x: e.clientX, y: e.clientY };
}

function findDragPoint(x, y) {
    for (let i = 0; i < shapes.length; i++) {
        let obj = shapes[i];
        let len = utils.distanceXY(x, y, obj.pos.x, obj.pos.y);
        let cRect = ((obj.h > obj.w) ? obj.h : obj.w) / 2;
        if (len < cRect) return obj;
    }
    return null;
}

//--------object-------------
function Shape_Rect(x, y, w, h, speed, direction) {
    this.pos = new Vector(x, y);// center
    this.w = w;
    this.h = h;

    this.directionAngle = toRadio(0);
    this.rotateSpeed = toRadio(30);

    this.vel = new Vector(0, 0);
    this.vel.setLength(speed);
    this.vel.setAngleDeg(direction);
}
Shape_Rect.prototype.update = function (dt) {
    this.directionAngle += this.rotateSpeed * dt;

    let nowSpeed = this.vel.clone().multiplyScalar(dt);
    this.pos.add(nowSpeed);

    // check edge
    if (this.pos.x < 0 && this.vel.x < 0) this.vel.x *= -1;
    if (this.pos.x > width && this.vel.x > 0) this.vel.x *= -1;
    if (this.pos.y < 0 && this.vel.y < 0) this.vel.y *= -1;
    if (this.pos.y > height && this.vel.y > 0) this.vel.y *= -1;

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
function getNow() {
    return new Date().getTime();
}