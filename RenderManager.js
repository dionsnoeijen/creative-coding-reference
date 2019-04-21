'use strict';

class RenderManager
{
    constructor() {
        this.scenes = {};
        this.activeScene = null;

        window.addEventListener('updateDescriptionText', this.onUpdateDescriptionText.bind(this));
    }

    onUpdateDescriptionText(event) {
        this.updateDescription(event.detail.sceneKey, event.detail.text);
    }

    init() {
        for (let key in this.scenes) {
            if (this.scenes.hasOwnProperty(key)) {
                this.scenes[key].init();
            }
        }
    }

    add(key, scene) {
        this.scenes[key] = scene;
    }

    updateDescription(key, text) {
        if (text !== undefined) {
            const description = this.scenes[key].getDescription();
            description.setText(text);
        }
        this.renderDescription(key);
    }

    renderDescription(key) {
        const description = this.scenes[key].getDescription();
        if (description) {
            HtmlHelper.draw(description.getTitle(), 'description-title');
            HtmlHelper.draw(description.getText(), 'description-content');
        }
    }

    enable(key) {
        this.activeScene = key;
        for (let sceneKey in this.scenes) {
            if (this.scenes.hasOwnProperty(sceneKey)) {
                this.scenes[sceneKey].disableEvents();
            }
        }
        this.scenes[this.activeScene].initEvents();
        this.renderDescription(key);
    }

    update() {
        if (this.activeScene !== null) {
            this.scenes[this.activeScene].update();
        }
    }
}
