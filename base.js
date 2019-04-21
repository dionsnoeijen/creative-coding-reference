'use strict';

// --------------------
// Init
// --------------------

const unit = 25;
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

context.font = "15px Courier";

// --------------------
// Drawing
// --------------------

function Clear() {
    this.update = function() {
        context.fillStyle = 'rgba(0, 0, 0, 1)';
        context.fillRect(0, 0, width, height);
        context.fill();
    };
}

// --------------------
// Drawing
// --------------------

function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function constrain(value, min, max) {
    return value > max ? max : value < min ? min : value;
}

function isCircleIntersecting(r1, r2) {
    const dx=r1.x-r2.x;
    const dy=r1.y-r2.y;
    const radiiSum=r1.size+r2.size;
    return((dx*dx+dy*dy)<radiiSum*radiiSum);
}

function detectColor(canvasContext, x, y) {
    const data = canvasContext.getImageData(x,y,1,1).data;
    const color = {
        r: data[0],
        g: data[1],
        b: data[2]
    };
    return color;
}

function fibonacci(num, memo) {
    memo = memo || {};
    if (memo[num]) return memo[num];
    if (num <= 1) return 1;
    return memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
}

function getRandomBetween(min, max) {
    return Math.floor(min + Math.random()*(max+1 - min));
}

function percentage(num, per) {
    return num/per*100;
}

function percentageToActual(width, percentage) {
    return width/100*percentage;
}

function isInRectangularBounds(v1, v2) {
    const xDir = v1.x < v2.x;
    const x1 = xDir ? v1.x : v2.x;
    const x2 = xDir ? v2.x : v1.x;

    const yDir = v1.y < v2.y;
    const y1 = yDir ? v1.y : v2.y;
    const y2 = yDir ? v2.y : v1.y;

    if (x1 < mousePos.x &&
        x2 > mousePos.x &&
        y1 < mousePos.y &&
        y2 > mousePos.y
    ) {
        return true;
    }
    return false;
}

function angleBetweenPoints(v1, v2) {
    let dy = v2.y-v1.y;
    let dx = v2.x-v1.x;
    let theta = Math.atan2(dy, dx);
    //theta *= 180/Math.PI;
    return theta;
}

function degrees360ToRadians(degrees) {
    return (degrees/360)*2*Math.PI;
}

function angleBetweenPointsInDegrees(v1, v2) {
    let dy = v2.y - v1.y;
    let dx = v2.x - v1.x;
    let degrees = Math.atan2(dy, dx);
    degrees *= 360/(Math.PI*2);
    if (degrees < 0) {
        degrees += 360;
    }
    return degrees;
}

function Vector(x, y, z) {

    this.x = x;
    this.y = y;
    this.z = z === undefined ? 0 : z;

    this.add = function(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    };

    this.addX = function(n) {
        this.x += n;
        return this;
    };

    this.addY = function(n) {
        this.y += n;
        return this;
    };

    this.addZ = function(n) {
        this.z += n;
        return this;
    };

    this.subtract = function(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    };

    this.subtractX = function(n) {
        this.x -= n;
        return this;
    };

    this.subtractY = function(n) {
        this.y -= n;
        return this;
    };

    this.subtractZ = function(n) {
        this.z -= n;
        return this;
    };

    this.multiply = function(n) {
        this.x *= n;
        this.y *= n;
        this.z *= n;
        return this;
    };

    this.multiplyX = function(n) {
        this.x *= n;
        return this;
    };

    this.multiplyY = function(n) {
        this.y *= n;
        return this;
    };

    this.multiplyZ = function(n) {
        this.z *= z;
        return this;
    };

    this.divide = function(n) {
        this.x /= n;
        this.y /= n;
        this.z /= n;
        return this;
    };

    this.magnitude = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };

    this.normalize = function() {
        let m = this.magnitude();
        if (m !== 0) {
            this.divide(m);
        }
    };

    this.limit = function(n) {
        if (this.magnitude() > n) {
            this.normalize();
            this.multiply(n);
        }
    };

    this.distance = function(v) {
        let dx = this.x - v.x,
            dy = this.y - v.y,
            dz = this.z - v.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };

    this.invert = function() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this;
    };

    this.inverseX = function() {
        this.x *= -1;
        return this;
    };

    this.inverseY = function() {
        this.y *= -1;
        return this;
    };

    this.inverseZ = function() {
        this.z *= -1;
        return this;
    };

    this.get = function() {
        return new Vector(this.x, this.y, this.z);
    };

    this.dot = function(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    };
}

// -------------------------
// Vector: Static
// -------------------------

Vector.add = function(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
};

Vector.subtract = function(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
};

Vector.multiply = function(v1, v2) {
    return new Vector(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
};

Vector.divide = function(v1, v2) {
    if (typeof v2 === Vector) {
        return new Vector(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
    } else {
        return new Vector(v1.x / v2, v1.y / v2, v1.z / v2);
    }
};

Vector.distance = function(v1, v2) {
    return v1.distance(v2);
};

Vector.copy = function(v) {
    return new Vector(v.x, v.y, v.z);
};

Vector.create = function(x, y, z) {
    return new Vector(x, y, z);
};

Vector.random3D = function() {
    const x = parseInt((Math.random() * 3)) -1,
          y = parseInt((Math.random() * 3)) -1,
          z = parseInt((Math.random() * 2)) -1;
    return new Vector(x, y, z);
};

// -------------------------
// Events
// -------------------------

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return Vector.create(evt.clientX - rect.left, evt.clientY - rect.top);
}

let mousePos = Vector.create(canvas.width / 2, canvas.height / 2);
let mouseDown = false;

canvas.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(canvas, evt);
}, false);

canvas.addEventListener('mousedown', function(evt) {
    mouseDown = true;
}, false);

canvas.addEventListener('mouseup', function(evt) {
    mouseDown = false;
});

window.addEventListener('resize', function(evt) {
    width = window.innerWidth;
    height = window.innerHeight;
    centerX = Math.floor((width/unit)/2);
    centerY = Math.floor((height/unit)/2);
    canvas.width = width;
    canvas.height = height;
});

const closeButton = document.getElementById('close');
const openButton = document.getElementById('open');
const description = document.getElementById('description');

let width = window.innerWidth;
let height = window.innerHeight;
let centerX = Math.floor((width/unit)/2);
let centerY = Math.floor((height/unit)/2);

canvas.width = width;
canvas.height = height;

const makeOpen = () => {
    canvas.style.left = description.offsetWidth.toString() + 'px';
    width -= description.offsetWidth;
    centerX = Math.floor((width/unit)/2);
    centerY = Math.floor((height/unit)/2);
    canvas.width = width;
};

const makeClose = () => {
    canvas.style.left = '0px';
    width = window.innerWidth;
    centerX = Math.floor((width/unit)/2);
    centerY = Math.floor((height/unit)/2);
    canvas.width = width;
};

makeOpen();
