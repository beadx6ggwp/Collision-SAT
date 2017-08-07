var particle = {
	pos: null,
	vel: null,
	radius: 10,
	gravity: null,
	mass: 1,
	bounce: -1,
	friction : 1,

	create: function (x, y, r, speed, direction, grav) {
		var obj = Object.create(this);
		obj.pos = vector.create(x, y);
		obj.radius = r;
		obj.vel = vector.create(0, 0);
		obj.gravity = vector.create(0, grav || 0);
		obj.vel.setLength(speed);
		obj.vel.setAngle(direction);
		return obj;
	},

	update: function () {
		this.vel.addTo(this.gravity);
		this.pos.addTo(this.vel);
	},

	setPos: function (x, y) {
		this.pos.x = x;
		this.pos.y = y;
	},

	getPos: function () {
		return { x: this.pos.x, y: this.pos.y };
	},

	accel: function (acc) {
		this.vel.addTo(acc);
	},

	angleTo: function (p2) {
		return Math.atan2(p2.pos.y - this.pos.y, p2.pos.x - this.pos.x);
	},

	distTo: function (p2) {
		let dx = p2.pos.x - this.pos.x,
			dy = p2.pos.y - this.pos.y;
		return Math.sqrt(dx * dx + dy * dy);
	},

	gravitateTo: function (p2) {
		let grav = vector.create(0, 0),
			dist = this.distTo(p2);

		grav.setLength(p2.mass / (dist * dist));
		grav.setAngle(this.angleTo(p2));
		this.vel.addTo(grav);
	}
};