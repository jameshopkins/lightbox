require('../../bower_components/bskyb-polyfill/src/scripts/polyfill');

var core = require('../../bower_components/bskyb-core/src/scripts/core');
var event = core.event;

var lightbox = (function() {

  function updateConfig (currentConfig, options) {
    var config = {
      isOpen: false,
      contentId: currentConfig.contentId,
      toggle: currentConfig.toggle,
      eventRegistry: {
        close: currentConfig.eventRegistry.close.slice(0),
        open: currentConfig.eventRegistry.open.slice(0),
        attach: currentConfig.eventRegistry.attach.slice(0),
      }
    };

    for (var option in options) {
      config[option] = options[option]
    }

    return new Lightbox(config);
  };

  observers = {
    add: function (currentConfig, eventType, cb) {
      var config = {
        isOpen: false,
        contentId: currentConfig.contentId,
        toggle: currentConfig.toggle,
        eventRegistry: {
          close: currentConfig.eventRegistry.close.slice(0),
          open: currentConfig.eventRegistry.open.slice(0),
          attach: currentConfig.eventRegistry.attach.slice(0),
        }
      }
      config.eventRegistry[eventType].push(cb);
      return new Lightbox(config);
    },
    notify: function(instance, eventType) {
      instance.config.eventRegistry[eventType].forEach(function(cb) {
        cb(instance);
      });
    }
  };

  classes = {
    open: 'lightbox-open',
    main: 'lightbox'
  };

  function Lightbox (config) {

    this.version = require('./utils/version.js');

    defaultConfig = {
      isOpen: false,
      toggle: false,
      eventRegistry: {
        close: [],
        open: [],
        attach: []
      }
    };

    this.config = config || defaultConfig;

  };

  Lightbox.prototype.settings = function (settings) {
    return updateConfig(this.config, settings);
  };

  Lightbox.prototype._addHTML = function () {

    if (this.config.toggle) {
      var element = document.querySelector('[data-modal=' + this.config.contentId + ']');
      element.addEventListener('click', function() {
        this.toggle()
      }.bind(this));
    }

    var lightboxContent = document.getElementById(this.config.contentId);

    var lightbox = document.createElement('div');
    lightbox.classList.add('lightbox', this.config.contentId + '-lightbox');
    lightbox.innerHTML = '<div class="skycom-container lightbox-container"><div class="lightbox-content" role="dialog"><button class="close">Close</button>' + lightboxContent.outerHTML + '</div></div>';

    lightboxContent.parentNode.replaceChild(lightbox, lightboxContent);

    var closeButton = lightbox.querySelector('button.close');
    var lightboxContent = lightbox.querySelector('.lightbox-content');

    lightbox.addEventListener('click', function(e) {
      if (e.target.classList.contains('close') || e.target.classList.contains('lightbox')) {
        e.preventDefault();
        this.close();
      }
    }.bind(this));

  };

  Lightbox.prototype.attach = function (id) {

    var updatedConfig = updateConfig(this.config, {
      contentId: id
    });

    updatedConfig._addHTML();

    observers.notify(updatedConfig, 'attach');

    return updatedConfig;

  };

  Lightbox.prototype.on = function (eventType, callback) {
    return observers.add(this.config, eventType, callback);
  };

  Lightbox.prototype.toggle = function () {

    if (this.config.isOpen) {
      this.close();
    } else {
      this.open();
    }

  };

  Lightbox.prototype.open = function () {

    var lightbox = document.querySelector('.' + this.config.contentId + '-lightbox');

    lightbox.classList.add(classes.open);

    observers.notify(this, 'open');
    this.config.isOpen = true;

    return this;

  };

  Lightbox.prototype.close = function () {

    var lightbox = document.querySelector('.' + this.config.contentId + '-lightbox');

    lightbox.classList.remove(classes.open);

    observers.notify(this, 'close');
    this.config.isOpen = false;

    return this;

  };

  return new Lightbox();

}());

module.exports = lightbox;

if (typeof skyComponents === "undefined") window.skyComponents = {};
skyComponents['lightbox'] = module.exports;
