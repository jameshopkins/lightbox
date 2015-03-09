/* Add HTML + CSS to setup page for functional testing */
require('../helper').loadAssets();

/* Require file to test */
var local = {}; local['lightbox'] = require('../../src/scripts/lightbox');

/* Start Test */
describe('lightbox module can ', function () {

    it('sum an array of numbers', function () {

        expect(new local['lightbox']().sum([1,2,3])).toBe(6);

    });

    it('version is attached', function () {

        expect(new local['lightbox']().version).toBe('0.0.0');

    });

});