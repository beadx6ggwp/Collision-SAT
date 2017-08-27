var SAT = {};

function Polygon(pos, points) {
    this.pos = pos || new Vector(0, 0);
    this.corners = points;
    this.angle = 0;
};
SAT.Polygon = Polygon;

function Box(pos, w, h) {
    this.pos = pos || new Vector(0, 0);
    this.w = w || 0;
    this.h = h || 0;
};
SAT.Box = Box;

Box.prototype.toPolygon = function () {
    let pos = this.pos;
    let w = this.w;
    let h = this.h;
    let points = [
        new Vector(w / 2, -h / 2),
        new Vector(w / 2, h / 2),
        new Vector(-w / 2, h / 2),
        new Vector(-w / 2, -h / 2)
    ];
    let obj = new Polygon(pos, points);
    return obj;
};


// return Vertices array
Polygon.prototype.getVertices = function () {
    let vertices = [];
    // Clockwise
    for (let i = 0; i < this.corners.length; i++) {
        let p1 = this.corners[i];

        let vec = new Vector(this.pos.x + p1.x, this.pos.y + p1.y);
        vec.rotateRefPoint(this.angle, this.pos);

        vertices.push(vec);
    }
    return vertices;
};

// return norms array
Polygon.prototype.getNorm = function () {
    let vertices = this.getVertices();
    let norms = [];
    let p1, p2, n;
    // Clockwise
    for (let i = 1; i < vertices.length; i++) {
        let p1 = vertices[i - 1],
            p2 = vertices[i];
        // 其實要取normalL,但因為電腦的Y軸是相反的，所以取normalR才符合
        n = new Vector(p2.x - p1.x, p2.y - p1.y).normalR();
        norms.push(n);
    }

    p1 = vertices[vertices.length - 1];
    p2 = vertices[0];
    n = new Vector(p2.x - p1.x, p2.y - p1.y).normalR();
    norms.push(n);

    return norms;
};