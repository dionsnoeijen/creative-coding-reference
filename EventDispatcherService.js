'use strict';

class EventDispatcherService {

    static dispatch(sceneKey, text, title = null, element = null) {

        let detail = {
            sceneKey: sceneKey,
            text: text
        };

        if (title !== null) {
            detail['title'] = title;
        }

        if (element !== null) {
            detail['element'] = element;
        }

        window.dispatchEvent(new CustomEvent('updateDescriptionText', {
            detail: detail
        }));
    }
}
