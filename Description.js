'use strict';

class Description {

    constructor() {
        this.title = null;
        this.text = null;
    }

    setTitle(title) {
        this.title = title;
    }

    setText(text) {
        this.text = text;
    }

    getTitle() {
        return this.title;
    }

    getText() {
        return this.text;
    }
}
