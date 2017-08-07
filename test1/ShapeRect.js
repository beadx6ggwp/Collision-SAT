//ShapeRect.js
function Shape_Rect(x, y, w, h, speed, direction) {
    this.pos = new Vector(x, y);// center
    this.w = w;
    this.h = h;
    this.corners = [
        // Clockwise
        // Upper right corner, Bottom right corner, Bottom left corner, Upper left corner
        new Vector(this.w / 2, -this.h / 2),
        new Vector(this.w / 2, this.h / 2),
        new Vector(-this.w / 2, this.h / 2),
        new Vector(-this.w / 2, -this.h / 2)
    ];

    this.directionAngle = toRadio(0);
    this.rotateSpeed = toRadio(0);

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

    if (debug) {
        ctx.strokeStyle = "#777";
        ctx.beginPath();
        ctx.moveTo(this.w / 4, 0);
        ctx.lineTo(this.w / 2, 0);
        ctx.stroke();
    }

    ctx.restore();
}

Shape_Rect.prototype.getVertices = function () {
    let vertices = [];

    // Clockwise
    for (let i = 0; i < this.corners.length; i++) {
        let p1 = this.corners[i];

        let vec = new Vector(this.pos.x + p1.x, this.pos.y + p1.y);
        vec.rotateRefPoint(this.directionAngle, this.pos);

        vertices.push(vec);
    }
    return vertices;
}

Shape_Rect.prototype.getNorm = function () {

}
