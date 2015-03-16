require('../../bower_components/bskyb-polyfill/src/scripts/polyfill');

var core = require('../../bower_components/bskyb-core/src/scripts/core');
var event = core.event;

/**
  TODO:
    - Add .destroy(), allows event listener removal too.
**/

var lightbox = (function() {

  function updateConfig (currentConfig, options) {
    var config = {
      isOpen: false,
      closeButton: currentConfig.closeButton,
      contentId: currentConfig.contentId,
      DOMActivation: currentConfig.DOMActivation,
      loadPersist: currentConfig.loadPersist,
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
        closeButton: currentConfig.closeButton,
        contentId: currentConfig.contentId,
        DOMActivation: currentConfig.DOMActivation,
        loadPersist: currentConfig.loadPersist,
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
      DOMActivation: false,
      loadPersist: false,
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

  Lightbox.prototype._buildDOM = function () {

    var lightboxContent = document.getElementById(this.config.contentId),
        DOMActivationControl = document.querySelector('[data-lightbox-activation-control=' + this.config.contentId + ']'),
        closeButton = '',
        lightbox = document.createElement('div');

    if (!lightboxContent) {
      throw new Error('The lightbox content cannot be found.')
    }

    if (this.config.DOMActivation) {
      if (!DOMActivationControl) {
        throw new Error('The DOMActivation control cannot be found. Check a DOM node exists that has a [data-lightbox-activation-control] attribute whose value corresponds to the ID of the lightbox content')
      }
      DOMActivationControl.addEventListener('click', function(e) {
        this.open('control');
      }.bind(this));
    }

    lightboxContent.parentNode.removeChild(lightboxContent);

    if (this.config.closeButton !== null) {
      closeButton = '<button data-lightbox-control="close" class="close">Close</button>';
    }

    // Transform the content
    lightbox.classList.add('lightbox', this.config.contentId + '-lightbox');
    lightbox.setAttribute('data-lightbox-control', 'overlay');
    lightbox.innerHTML = '<div class="skycom-container lightbox-container"><div class="lightbox-content" role="dialog">' + closeButton + lightboxContent.outerHTML + '</div></div>';

    document.body.appendChild(lightbox);

    var lightboxContent = lightbox.querySelector('.lightbox-content');

    // Set up close actions
    lightbox.addEventListener('click', function(e) {
      if (e.target.classList.contains('close') || e.target.classList.contains('lightbox')) {
        e.preventDefault();
        this.close(e.target.getAttribute('data-lightbox-control'));
      }
    }.bind(this));

  };

  Lightbox.prototype.attach = function (id) {

    var updatedConfig = updateConfig(this.config, {
      contentId: id
    });

    updatedConfig._buildDOM();
    observers.notify(updatedConfig, 'attach');

    return updatedConfig;

  };

  Lightbox.prototype.on = function (eventType, callback) {
    return observers.add(this.config, eventType, callback);
  };

  /*Lightbox.prototype.DOMActivation = function () {

    if (this.config.isOpen) {
      this.close();
    } else {
      this.open();
    }

  };*/

  //Lightbox.prototype.destroy = function () {};

  Lightbox.prototype.open = function (context) {

    if (typeof this.config.contentId === 'undefined') {
      throw new Error('You cannot assign an interaction state to a lightbox that isnt\'t attached to a DOM node')
    }

    var lightbox = document.querySelector('.' + this.config.contentId + '-lightbox');

    lightbox.classList.add(classes.open);

    document.body.style.overflow = 'hidden';

    this.config.isOpen = true;
    this.config.context = context || 'system';
    observers.notify(this, 'open');

    return this;

  };

  Lightbox.prototype.close = function (context) {

    if (typeof this.config.contentId === 'undefined') {
      throw new Error('You cannot assign an interaction state to a lightbox that isnt\'t attached to a DOM node')
    }

    document.body.style.overflow = '';

    var lightbox = document.querySelector('.' + this.config.contentId + '-lightbox');

    lightbox.classList.remove(classes.open);

    this.config.isOpen = false;
    this.config.context = context || 'system';

    observers.notify(this, 'close');

    return this;

  };

  return new Lightbox();

}());

module.exports = lightbox;

if (typeof skyComponents === "undefined") window.skyComponents = {};
skyComponents['lightbox'] = module.exports;
