'use strict';

const BASIC_VECTOR_SCENE_KEY = 'basic-vector';

class BasicVector {

    constructor() {
        this.description = new Description();
        const defaultDescription = this.defaultDescription();

        this.description.setTitle(defaultDescription.title);
        this.description.setText(defaultDescription.text);

        this.canvasClick = this.onCanvasClick.bind(this);
        this.canvasMouseMove = this.onCanvasMouseMove.bind(this);

        this.init();
    }

    initEvents() {
        canvas.addEventListener('click', this.canvasClick);
        canvas.addEventListener('mousemove', this.canvasMouseMove);
    }

    disableEvents() {
        canvas.removeEventListener('click', this.canvasClick);
        canvas.removeEventListener('mousemove', this.canvasMouseMove);
    }

    onCanvasClick(event) {
        event.preventDefault();
        let hit = false;
        this.arrows.forEach((arrow) => {
            if (isInRectangularBounds(arrow.v1, arrow.v2)) {
                EventDispatcherService.dispatch(
                    BASIC_VECTOR_SCENE_KEY,
                    `
                        <div>
                            <h3>Vector [${arrow.vector.x},${arrow.vector.y}]</h3>
                            <p>It has a magnitude or length of <b>${arrow.vector.magnitude()}</b></p>
                            
                            <p>
                                It's magnitude can be calculated by taking the root of<br /><b>x * x + y * y</b><br />
                                So the square root of <b>${arrow.vector.x} * ${arrow.vector.x} + ${arrow.vector.y} * ${arrow.vector.y}</b> results in:<br />
                                <b>${Math.sqrt(arrow.vector.x * arrow.vector.x + arrow.vector.y * arrow.vector.y)}</b>
                            </p>
                            
                            <h3>JavaScript</h3>
                            <pre>Math.sqrt(this.x * this.x + this.y * this.y);</pre>

                            <p>It has a starting point of [${arrow.v1.x / unit - centerX},${arrow.v1.y / unit - centerY}] and it ends at [${arrow.v2.x / unit - centerX},${arrow.v2.y / unit - centerY}]</p>
                        </div>
                    `,
                    arrow
                );
                if (!hit) { hit = true; }
            }
        });
        if (!hit) {
            EventDispatcherService.dispatch(
                BASIC_VECTOR_SCENE_KEY,
                this.defaultDescription().text
            );
        }
    }

    onCanvasMouseMove() {
        this.arrows.forEach((arrow) => {
            arrow.unHighLight();
            if (isInRectangularBounds(arrow.v1, arrow.v2)) {
                arrow.highLight('rgba(255, 255, 255, 1)');
            }
        });
    }

    init() {
        this.arrows = [];
        const vector1 = Vector.create(9, 6);
        this.arrows.push(Arrow.create(
            Vector.create(0, 0),
            vector1,
            'rgba(0, 200, 255, 1)'
        ));
        this.arrows.push(Arrow.create(
            Vector.create(-4, -4),
            Vector.create(5, -2),
            'rgba(200, 255, 0, 1)'
        ));
        this.arrows.push(Arrow.create(
            Vector.create(-4, 2),
            Vector.create(-4, 5),
            'rgba(0, 255, 200, 1)'
        ));

        const vector2 = Vector.create(1, 5);
        this.arrows.push(Arrow.create(
            vector1,
            vector2,
            'rgba(0, 100, 200, 1)'
        ));
    }

    update() {
        this.arrows.forEach((arrow) => {
            arrow.update();
        });
    }

    defaultDescription() {
        return {
            title: 'Basic Vector',
            text: `
                <div>
                    <p>The properties of basic vectors are simple</p>
                    <h3>Example:</h3>
                    <ul>
                        <li>Displacement on X = 5</li>
                        <li>Displacement on Y = 3</li>
                        <li>This will get you a vector of 5,3</li>
                    </ul>
                    <p>On a grid this will mean a <b>starting position x + 5 and starting position y + 3</b>.</p>
                    <p>Therefore it has a direction and a magnitude (it's length).</p>
                    
                    <p>Click on a <b>vector</b> to isolate it and see more of it's properties.</p>
                </div>
            `
        };
    }

    getDescription() {
        return this.description;
    }
}
