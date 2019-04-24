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
        this.center = Vector.create(centerX*unit, centerY*unit);
    }

    initEvents() {

    }

    disableEvents() {

    }

    update() {
        this.mouse = Vector.subtract(mousePos, this.center);
        this.mouse.multiply(this.vectorScale);
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
    }

    defaultDescription() {
        return {
            title: 'Vector Subtraction',
            text: `
                <div>
                    <p>This is a description</p>
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
    }

    clearGui(gui) {
        if (this.guiVectorScale !== undefined) {
            gui.remove(this.guiVectorScale);
            delete this.guiVectorScale;
        }
    }
}
