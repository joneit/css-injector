'use strict';

/* global describe, it, beforeEach, afterEach */

require('should'); // extends Object with `should`

var cssInjector = require('../src/');

describe('cssInjector that', function() {
    it('is a function', function() {
        cssInjector.should.be.a.Function();
    });
    it('more tests needed');
    describe('has a property `idPrefix` that', function() {
        it('is a string', function() {
            (cssInjector.idPrefix).should.be.a.String();
        });
        it('initialized to `\'injected-stylesheet-\'`', function() {
            (cssInjector.idPrefix).should.equal('injected-stylesheet-');
        });
    });
});
