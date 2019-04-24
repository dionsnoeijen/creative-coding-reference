'use strict';

const BASIC_VECTOR_MATH_SCENE_KEY = 'basic-vector-math';

class BasicVectorMath {

    constructor() {
        this.description = new Description();
        const defaultDescription = this.defaultDescription();
        this.description.setTitle(defaultDescription.title);
        this.description.setText(defaultDescription.text);

        this.init();
    }

    init() {
        this.vectorScale = 1;
        this.normalize = false;
        this.center = Vector.create(centerX*unit, centerY*unit);
    }

    initEvents() {

    }

    disableEvents() {

    }

    update() {
        this.mouse = Vector.subtract(mousePos, this.center);
        if (this.normalize) {
            this.mouse.normalize();
            this.mouse.multiply(this.vectorScale*100);
        } else {
            this.mouse.multiply(this.vectorScale);
        }
        this.mouse.add(this.center);
        this.draw();
    }

    draw() {
        context.lineWidth = 2;
        context.strokeStyle = 'rgba(255, 0, 0, 1)';
        context.beginPath();
        context.moveTo(this.center.x, this.center.y);
        context.lineTo(this.mouse.x, this.mouse.y);
        context.stroke();

        const angle = angleBetweenPoints(this.center, this.mouse);
        const difference = 2.8;

        context.beginPath();
        context.moveTo(this.mouse.x, this.mouse.y);
        context.lineTo(
            this.mouse.x + Math.cos(angle+difference) * 20,
            this.mouse.y + Math.sin(angle+difference) * 20
        );
        context.stroke();
        context.closePath();

        context.beginPath();
        context.moveTo(this.mouse.x, this.mouse.y);
        context.lineTo(
            this.mouse.x + Math.cos(angle-difference) * 20,
            this.mouse.y + Math.sin(angle-difference) * 20
        );
        context.stroke();
        context.closePath();
    }

    defaultDescription() {
        return {
            title: 'Basic Vector Math',
            text: `
                <div>
                    <p>Now, let's get into some basic math for vectors a little deeper.</p>
                    <p>We want to know about subtraction, multiplication and division also.</p>
                    <p>So, we could draw a line between the center and the mouse position by just moveTo(center) and lineTo(mouse).</p>
                    <p>
                        However, this is not really drawing the vector since we are just drawing a line between two points.
                        To apply vector math, we will need the difference between the mouse position and the center. This is the vector.
                        Before drawing the vector, we can choose to multiply (scale) the vector. Change the vector scale to see what happends.
                        After applying the vector scale, we will add the center again, since we want to draw the vector from the center.
                    </p>
                    <pre>
update() {
    this.mouse = Vector.subtract(mousePos, this.center);
    this.mouse.multiply(this.vectorScale);
    this.mouse.add(this.center);
    this.draw();
}
                    </pre>
                </div>
            `
        }
    }

    getDescription() {
        return this.description;
    }

    gui(gui) {
        if (this.guiVectorScale === undefined) {
            this.guiVectorScale = gui.add(this, 'vectorScale', -3, 3);
        }
        if (this.guiNormalize === undefined) {
            this.guiNormalize = gui.add(this, 'normalize', false);
        }
    }

    clearGui(gui) {
        if (this.guiVectorScale !== undefined) {
            gui.remove(this.guiVectorScale);
            delete this.guiVectorScale;
        }

        if (this.guiNormalize !== undefined) {
            gui.remove(this.guiNormalize);
            delete this.guiNormalize;
        }
    }
}
