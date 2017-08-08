var utils = {
    distance: function (p1, p2) {
        var dx = p2.x - p1.x,
            dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    },

    distanceXY: function (x1, y1, x2, y2) {
        let dx = x1 - x2,
            dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    },

    CircleCollision: function (c1, c2) {
        return utils.distance(c1, c2) <= c1.radius + c2.radius;
    },

    CirclePointCollision: function (x, y, circle) {
        return utils.distanceXY(x, y, circle.x, circle.y) <= circle.radius;
    },

    PoingInRect: function (x, y, rect) {
        return utils.InRange(x, rect.x, rect.x + rect.width) &&
            utils.InRange(y, rect.y, rect.y + rect.height);
    },

    RectCollision: function (r1, r2) {
        return utils.RangeIntersect(r1.x, r1.x + r1.width, r2.x, r2.x + r2.width) &&
            utils.RangeIntersect(r1.y, r1.y + r1.height, r2.y, r2.y + r2.height)
    },

    InRange: function (value, min, max) {
        // check min is min,max is max
        return value >= Math.min(min, max) && value <= Math.max(min, max);
    },

    RangeIntersect: function (min1, max1, min2, max2) {
        // imagine here have two rectangle,and u will know how does it work
        return Math.max(min1, max1) >= Math.min(min2, max2) &&
            Math.min(min1, max1) <= Math.max(min2, max2);
    }
};