'use strict';

class HtmlHelper {

    static htmlToElement(html) {
        if (html !== null) {
            const template = document.createElement('template');
            html = html.trim(); // Never return a text node of whitespace as the result
            template.innerHTML = html;
            return template.content.firstChild;
        }
        return null;
    }

    static draw(html, to) {
        // First see if we have the fixed div
        let screen = document.querySelector('#' + to);

        // Add html to screen
        screen.innerHTML = '';
        const add = HtmlHelper.htmlToElement(html);
        if (add !== null) {
            screen.append(add);
        }
    }

    static clear(selector) {
        const screen = document.querySelector('#' + selector);
        screen.remove();
    }
}
