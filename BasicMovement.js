'use strict';

const BASIC_MOVEMENT_SCENE_KEY = 'basic-movement';

class BasicMovement {

    constructor() {
        this.description = new Description();
        const defaultDescription = this.defaultDescription();
        this.description.setTitle(defaultDescription.title);
        this.description.setText(defaultDescription.text);
        this.canvasClick = this.onCanvasClick.bind(this);
        this.canvasMouseMove = this.onCanvasMouseMove.bind(this);

        this.speedMultiplier = 1;

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
        console.log('MOVEMENT CLICK');
    }

    onCanvasMouseMove(event) {

    }

    getDescription() {
        return this.description;
    }

    init() {
        this.location = Vector.create(0, centerY*unit);
        this.velocity = Vector.create(
            Math.random(),
            (Math.random() < .5 ? Math.random() : (Math.random()*-1))
        );
    }

    update() {
        const velocity = Vector.copy(this.velocity);
        velocity.multiply(this.speedMultiplier);
        this.location.add(velocity);
        if ((this.location.x > width) || (this.location.x < 0)) {
            this.velocity.x *= -1;
        }
        if ((this.location.y > height) || (this.location.y < 0)) {
            this.velocity.y *= -1;
        }
        this.draw();
    }

    draw() {
        context.fillStyle = 'rgba(255, 0, 0, 1)';
        context.beginPath();
        context.arc(this.location.x, this.location.y, 10, 0, Math.PI*2);
        context.fill();
        context.closePath();
    }

    defaultDescription() {
        return {
            title: 'Basic Movement',
            text: `
                <div>
                    <p>
                        The most basic movement involves a <b>location</b> and a <b>velocity</b><br />
                        Per frame we would have <b>location += velocity</b>
                    </p>
                    <h3>Vector add method</h3>
                    <pre>
this.add = function(v) {
    this.x += v.x;
    this.y += v.y;
}
                    </pre>
                    <p>Initialize both vectors in the init method, in this example theres some x / y conversion going on because of the center that is at 0, 0</p>
                    <p>I want it to start at the left center, in a random direction.</p>
                    <pre>
init() {
    this.location = Vector.create(0, centerY*unit);
    this.velocity = Vector.create(
        Math.random(),
        (Math.random() < .5 ? Math.random() : (Math.random()*-1))
    );
}
                    </pre>
                    <p>Per frame, in the update method. In the most basic form we can have:</p>
                    <pre>
update() {
    this.location.add(this.velocity);
    this.draw();
}
                    </pre>
                    <p>I also want to have some control over it's speed, therefore I introduce a 'speedMultiplier' and change the update method to this:</p>
                    <pre>
update() {
    const velocity = Vector.copy(this.velocity);
    velocity.multiply(this.speedMultiplier);
    this.location.add(velocity);
    this.draw();
}
                    </pre>
                    <p>As you can see I make a copy of velocity, otherwise it would increment exponentially.</p>
                    <p>Now, I also want to make sure it will bounce of the edges.</p>
                    <pre>
update() {
    const velocity = Vector.copy(this.velocity);
    velocity.multiply(this.speedMultiplier);
    this.location.add(velocity);
    if ((this.location.x > width) || (this.location.x < 0)) {
        this.velocity.x *= -1;
    }
    if ((this.location.y > height) || (this.location.y < 0)) {
        this.velocity.y *= -1;
    }
    this.draw();
}
                    </pre>
                    <p>The draw method called at the end of every update is simple</p>
                    <pre>
draw() {
    context.fillStyle = 'rgba(255, 0, 0, 1)';
    context.beginPath();
    context.arc(this.location.x, this.location.y, 10, 0, Math.PI*2);
    context.fill();
    context.closePath();
}
                    </pre>
                </div>
            `
        }
    }

    gui(gui) {
        if (this.guiSpeedMultiplier === undefined) {
            this.guiSpeedMultiplier = gui.add(this, 'speedMultiplier', -20, 20);
        }
    }

    clearGui(gui) {
        if (this.guiSpeedMultiplier !== undefined) {
            gui.remove(this.guiSpeedMultiplier);
            delete this.guiSpeedMultiplier;
        }
    }
}
