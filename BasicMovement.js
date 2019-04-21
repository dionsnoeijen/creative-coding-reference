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

    init() {

    }

    onCanvasClick(event) {
        console.log('MOVEMENT CLICK');
    }

    onCanvasMouseMove(event) {

    }

    getDescription() {
        return this.description;
    }

    update() {

    }

    defaultDescription() {
        return {
            title: 'Basic Movement',
            text: '<p>Basic movement introduction</p>'
        }
    }
}
