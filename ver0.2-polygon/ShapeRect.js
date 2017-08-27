//ShapeRect.js
function Shape(pos, speed, direction) {
    this.pos = pos || new Vector(0, 0);// center

    this.satShape = null;

    this.rotateSpeed = toRadio(0);

    this.vel = new Vector(0, 0);
    this.vel.setLength(speed);
    this.vel.setAngleDeg(direction);

    this.color = "#FFF";
}

Shape.prototype.createSAT_Polygon = function (points) {
    this.satShape = new SAT.Polygon(this.pos, points);
}
Shape.prototype.createSAT_Box = function (w, h) {
    let obj = new SAT.Box(this.pos, w, h);
    this.satShape = obj.toPolygon();
}

Shape.prototype.update = function (dt) {
    this.satShape.angle += this.rotateSpeed * dt;

    let nowSpeed = this.vel.clone();
    nowSpeed.multiplyScalar(dt);

    this.pos.add(nowSpeed);

    // check edge
    if (this.pos.x < 0 && this.vel.x < 0) this.vel.x *= -1;
    if (this.pos.x > width && this.vel.x > 0) this.vel.x *= -1;
    if (this.pos.y < 0 && this.vel.y < 0) this.vel.y *= -1;
    if (this.pos.y > height && this.vel.y > 0) this.vel.y *= -1;

}

Shape.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.satShape.angle);

    let points = this.satShape.corners;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y)
    }
    ctx.closePath();

    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();

    let dline = new Vector((points[1].x - points[0].x) / 2,
        (points[1].y - points[0].y) / 2);

    ctx.strokeStyle = "#777";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(dline.x, dline.y);
    ctx.stroke();

    ctx.restore();
}
