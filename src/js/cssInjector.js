'use strict';

/* eslint-env browser */

/** @namespace cssInjector */

(function (module) {  // eslint-disable-line no-unused-expressions

    // This closure supports NodeJS-less client side includes with <script> tags. See https://github.com/joneit/mnm.

    /**
     * @summary Insert base stylesheet into DOM
     * @desc Creates a new `<style>...</style>` element from the named text string(s) and inserts it.
     * @returns A reference to the newly created `<style>...</style>` element.
     * @param {string|string[]} cssRules
     * @param {string} [ID]
     * @param {undefined|null|Element|string} [referenceElement] - Overloads:
     * * `undefined` type (or omitted): injects stylesheet at top of `<head>...</head>` element
     * * `null` value: injects stylesheet at bottom of `<head>...</head>` element
     * * `Element` type: injects stylesheet immediately before given element, wherever it is found.
     * * `string` type: injects stylesheet immediately before given first element found that matches the given css selector.
     * @memberOf cssInjector
     */
    function cssInjector(cssRules, ID, referenceElement) {
        if (ID) {
            ID = cssInjector.idPrefix + ID;

            if (document.getElementById(ID)) {
                return; // stylesheet already in DOM
            }
        }

        if (typeof referenceElement === 'string') {
            referenceElement = document.querySelector(referenceElement);
            if (!referenceElement) {
                throw 'Cannot find reference element for CSS injection.';
            }
        } else if (referenceElement && !(referenceElement instanceof Element)) {
            throw 'Given value not a reference element.';
        }

        var style = document.createElement('style');
        style.type = 'text/css';
        if (ID) {
            style.id = ID;
        }
        if (cssRules instanceof Array) {
            cssRules = cssRules.join('\n');
        }
        cssRules = '\n' + cssRules + '\n';
        if (style.styleSheet) {
            style.styleSheet.cssText = cssRules;
        } else {
            style.appendChild(document.createTextNode(cssRules));
        }

        var container = referenceElement && referenceElement.parentNode || document.head || document.getElementsByTagName('head')[0];

        if (referenceElement === undefined) {
            referenceElement = container.firstChild;
        }

        container.insertBefore(style, referenceElement);

        return style;
    }

    /**
     * @summary Optional prefix for `<style>` tag IDs.
     * @desc Defaults to `'injected-stylesheet-'`.
     * @type {string}
     * @memberOf cssInjector
     */
    cssInjector.idPrefix = 'injected-stylesheet-';

    // Interface
    module.exports = cssInjector;
})(
    typeof module === 'object' && module || (window.cssInjector = {}),
    typeof module === 'object' && module.exports || (window.cssInjector.exports = {})
) || (
    typeof module === 'object' || (window.cssInjector = window.cssInjector.exports)
);

/* About the above IIFE:
 * This file is a "modified node module." It functions as usual in Node.js *and* is also usable directly in the browser.
 * 1. Node.js: The IIFE is superfluous but innocuous.
 * 2. In the browser: The IIFE closure serves to keep internal declarations private.
 * 2.a. In the browser as a global: The logic in the actual parameter expressions + the post-invocation expression
 * will put your API in `window.cssInjector`.
 * 2.b. In the browser as a module: If you predefine a `window.module` object, the results will be in `module.exports`.
 * The bower component `mnm` makes this easy and also provides a global `require()` function for referencing your module
 * from other closures. In either case, this works with both NodeJs-style export mechanisms -- a single API assignment,
 * `module.exports = yourAPI` *or* a series of individual property assignments, `module.exports.property = property`.
 *
 * Before the IIFE runs, the actual parameter expressions are executed:
 * 1. If `module` object defined, we're in NodeJs so assume there is a `module` object with an `exports` object
 * 2. If `module` object undefined, we're in browser so define a `window.cssInjector` object with an `exports` object
 *
 * After the IIFE returns:
 * Because it always returns undefined, the expression after the || will always execute:
 * 1. If `module` object defined, then we're in NodeJs so we're done
 * 2. If `module` object undefined, then we're in browser so redefine`window.cssInjector` as its `exports` object
 */
