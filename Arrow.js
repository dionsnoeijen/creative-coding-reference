'use strict';

class Arrow {

    constructor(v1, v2, color) {

        this.center = Vector.create(centerX, centerY);
        this.vector = Vector.copy(v2);

        this.v1 = Vector.add(this.center, v1);
        this.v2 = Vector.add(v1, Vector.add(this.center, v2));

        this.center.multiply(unit);
        this.v1.multiply(unit);
        this.v2.multiply(unit);

        this.textCenterPosition = Vector.copy(this.vector);
        this.textCenterPosition.divide(2);
        this.textCenterPosition.add(v1);
        this.textCenterPosition.addY(-.2);
        this.textCenterPosition.addX(.2);
        this.textCenterPosition.multiply(unit);
        this.textCenterPosition.add(this.center);

        this.color = color;
        this.drawColor = this.color;
    }

    update() {
        this.draw();
    }

    highLight() {
        this.drawColor = 'rgba(255, 255, 255, 1)';
    }

    unHighLight() {
        this.drawColor = this.color;
    }

    draw() {
        context.lineWidth = 2;
        context.strokeStyle = this.drawColor;

        context.fillStyle = this.drawColor;
        context.beginPath();
        context.arc(this.v1.x, this.v1.y, 5, 0, Math.PI*2);
        context.fill();
        context.closePath();

        context.beginPath();
        context.moveTo(this.v1.x, this.v1.y);
        context.lineTo(this.v2.x, this.v2.y);
        context.stroke();
        context.closePath();

        const angle = angleBetweenPoints(this.v1, this.v2);
        const difference = 2.8;

        context.beginPath();
        context.moveTo(this.v2.x, this.v2.y);
        context.lineTo(
            this.v2.x + Math.cos(angle+difference) * 20,
            this.v2.y + Math.sin(angle+difference) * 20
        );
        context.stroke();
        context.closePath();

        context.beginPath();
        context.moveTo(this.v2.x, this.v2.y);
        context.lineTo(
            this.v2.x + Math.cos(angle-difference) * 20,
            this.v2.y + Math.sin(angle-difference) * 20
        );
        context.stroke();
        context.closePath();

        context.fillStyle = this.drawColor;

        context.font = "12px Courier";
        context.fillText(
            `[${(this.v1.x-this.center.x)/unit}, ${(this.v1.y-this.center.y)/unit}]`,
            this.v1.x+5, this.v1.y-5
        );

        context.fillText(
            `[${(this.v2.x-this.center.x)/unit}, ${(this.v2.y-this.center.y)/unit}]`,
            this.v2.x+5, this.v2.y-5
        );

        context.save();
        context.translate(this.textCenterPosition.x, this.textCenterPosition.y);
        context.rotate(angle);
        context.textAlign = 'center';
        context.fillText(
            `Vector of [${this.vector.x}, ${this.vector.y}]`,
            0, 0
        );
        context.restore();
    }

    static create(v1, v2, color) {
        return new Arrow(v1, v2, color);
    }
}
