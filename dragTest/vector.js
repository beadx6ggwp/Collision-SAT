var vector = {
    x: 1,
    y: 0,

    create: function (x, y) {
        let obj = Object.create(this);
        obj.setX(x);
        obj.setY(y);
        return obj;
    },

    setX: function (value) {
        this.x = value;
    },

    getX: function () {
        return this.x;
    },

    setY: function (value) {
        this.y = value;
    },

    getY: function () {
        return this.y;
    },

    add: function (v2) {
        return vector.create(this.x + v2.getX(), this.y + v2.getY());
    },

    subtract: function (v2) {
        return vector.create(this.x - v2.getX(), this.y - v2.getY());
    },

    multiply: function (val) {
        return vector.create(this.x * val, this.y * val);
    },

    divide: function (val) {
        return vector.create(this.x / val, this.y / val);
    },

    addTo: function (v2) {
        this.x += v2.getX();
        this.y += v2.getY();
    },

    subtractFrom: function (v2) {
        this.x -= v2.getX();
        this.y -= v2.getY();
    },

    multiplyBy: function (val) {
        this.x *= val;
        this.y *= val;
    },

    divideBy: function (val) {
        this.x /= val;
        this.y /= val;
    },    

    setAngle: function (angle) {
        let length = this.getLength();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    },

    getAngle: function () {
        return Math.atan2(this.y, this.x);
    },

    setLength: function (length) {
        let angle = this.getAngle();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    },

    getLength: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
};