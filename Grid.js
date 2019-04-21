'use strict';

class Grid {
    update() {
        this.draw();
    }

    draw() {
        context.lineWidth = 1;
        context.strokeStyle = 'rgba(255, 255, 255, .3)';
        for (let x = unit ; x <= width ; x+=unit) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, height);
            context.stroke();
        }
        for (let y = unit ; y <= height ; y+=unit) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(width, y);
            context.stroke();
        }

        // Center cross
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(centerX*unit, 0);
        context.lineTo(centerX*unit, height);
        context.stroke();
        context.beginPath();
        context.moveTo(0, centerY*unit);
        context.lineTo(width, centerY*unit);
        context.stroke();

        context.fillStyle = "white";
        context.textAlign = "left";
        context.fillText("[0, 0]", (width/2)+5, (height/2)+17);
    }
}
