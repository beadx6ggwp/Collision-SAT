function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

/* 
    var vec = Vector.fromArray([42,21]);
    vec.toString();
    // => x:42, y:21
*/
Vector.fromArray = function (arr) {
    return new Victor(arr[0] || 0, arr[1] || 0);
};

/*
    var vec = Victor.fromObject({ x: 42, y: 21 });
    vec.toString();
    // => x:42, y:21
*/
Vector.fromObject = function (obj) {
    return new Victor(obj.x || 0, obj.y || 0);
};


Vector.prototype.clone = function () {
    return new Victor(this.x, this.y);
};


Vector.prototype.toString = function () {
    return 'x:' + this.x + ', y:' + this.y;
};



Vector.prototype.add = function (vec) {
    this.x += vec.x;
    this.y += vec.y;
};
Vector.prototype.addScalar = function (scalar) {
    this.x += scalar;
    this.y += scalar;
};


Vector.prototype.subtract = function (vec) {
    this.x -= vec.x;
    this.y -= vec.y;
};
Vector.prototype.subtractScalar = function (scalar) {
    this.x -= scalar;
    this.y -= scalar;
};


Vector.prototype.multiply = function (vector) {
    this.x *= vector.x;
    this.y *= vector.y;
};
Vector.prototype.multiplyScalar = function (scalar) {
    this.x *= scalar;
    this.y *= scalar;
};


Vector.prototype.divide = function (vector) {
    this.x /= vector.x;
    this.y /= vector.y;
    return this;
};
Vector.prototype.divideScalar = function (scalar) {
    if (scalar !== 0) {
        this.x /= scalar;
        this.y /= scalar;
    } else {
        this.x = 0;
        this.y = 0;
    }
};


Vector.prototype.dot = function (vec2) {
    return this.x * vec2.x + this.y * vec2.y;
};

Vector.prototype.cross = function (vec2) {
    return (this.x * vec2.y) - (this.y * vec2.x);
};
Vector.prototype.projectOnto = function (vec2) {
    let coeff = ((this.x * vec2.x) + (this.y * vec2.y)) / ((vec2.x * vec2.x) + (vec2.y * vec2.y));
    this.x = coeff * vec2.x;
    this.y = coeff * vec2.y;
    return this;
};


Vector.prototype.setAngle = function (angle) {
    let length = this.length();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
};
Vector.prototype.setAngleDeg = function (angle) {
    let length = this.length();
    angle = this.deg2rad(angle);
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
};

Vector.prototype.getAngle = function () {
    return Math.atan2(this.y, this.x);
};
Vector.prototype.getAngleDeg = function () {
    return this.rad2deg(this.getAngle());
};

Vector.prototype.rotate = function (angle) {
    this.x = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
    this.y = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));
};
Vector.prototype.rotateDeg = function (angle) {
    angle = this.deg2rad(angle);
    this.rotate(angle);
};


Vector.prototype.setLength = function (len) {
    let angle = this.getAngle();
    this.x = Math.cos(angle) * len;
    this.y = Math.sin(angle) * len;
};

Vector.prototype.length = function () {
    return Math.sqrt(this.lengthSq());
};
Vector.prototype.lengthSq = function () {
    return this.x * this.x + this.y * this.y;
};

Vector.prototype.normalize = function () {
    let length = this.length();

    if (length === 0) {
        this.x = 1;
        this.y = 0;
    } else {
        this.divide(Victor(length, length));
    }
};
Vector.prototype.norm = Vector.prototype.normalize;

Vector.prototype.unfloat = function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
};
Vector.prototype.toFixed = function (precision) {
    if (typeof precision === 'undefined') { precision = 8; }
    this.x = this.x.toFixed(precision);
    this.y = this.y.toFixed(precision);
    return this;
};

Vector.prototype.rad2deg = function (rad) {
    return rad * 180 / Math.PI;
};
Vector.prototype.deg2rad = function (deg) {
    return deg * Math.PI / 180;
};
