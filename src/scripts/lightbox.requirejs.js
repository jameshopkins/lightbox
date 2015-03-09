var local = {}; local['lightbox'] = require('./lightbox');

if (typeof window.define === "function" && window.define.amd) {
    define('bower_components/bskyb-lightbox/dist/scripts/lightbox.requirejs', [], function() {
        'use strict';
        return local['lightbox'];
    });
}