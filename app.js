'use strict';

/**
 * The idea behind this application is to capture everything I
 * learn from math in a visual example with code.
 *
 * @constructor
 */
function Stage() {
    const clear = new Clear();
    const grid = new Grid();
    const gui = new dat.GUI();

    const basicMovement = new BasicMovement();

    const renderManager = new RenderManager(gui);
    renderManager.add(BASIC_VECTOR_SCENE_KEY, new BasicVector());
    renderManager.add(BASIC_MOVEMENT_SCENE_KEY, basicMovement);
    renderManager.enable(BASIC_VECTOR_SCENE_KEY);

    let controller = gui.add(renderManager, 'activeScene', [ BASIC_VECTOR_SCENE_KEY, BASIC_MOVEMENT_SCENE_KEY ]);
    controller.onChange((value) => {
        renderManager.enable(value);
    });

    this.reinit = () => {
        renderManager.init();
    };

    let animate = function() {
        clear.update();
        grid.update();
        renderManager.update();
        requestAnimationFrame(animate);
    }.bind(this);

    animate();
}

window.stage = new Stage();

openButton.addEventListener('click', (e) => {
    e.preventDefault();
    description.classList.add('open');
    makeOpen();
    stage.reinit();
});

closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    description.classList.remove('open');
    makeClose();
    stage.reinit();
});
