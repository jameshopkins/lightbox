/* Add HTML + CSS to setup page for functional testing */
require('../helper').loadAssets();

/* Require file to test */
var local = {}; local['lightbox'] = require('../../src/scripts/lightbox');

/* Start Test */
describe('Lightbox', function () {

  describe('State handling', function () {

    var base, composed;

    afterEach(function() {
      base = composed = null
    });

    describe('Component-level immutability', function () {

      // TODO: Add .on() coverage here

      it('calling .settings() returns a new lightbox instance', function () {

        base = local['lightbox'].settings({ DOMActivation: true });
        composed = base.settings({ loadPersist: true });
        expect(base.config.loadPersist).toBeFalsy();

      })

      it('calling .attach() returns a new lightbox instance', function () {

        base = local['lightbox'].attach('demo-one');
        composed = base.attach('demo-two');
        expect(base.config.contentId).toEqual('demo-one');

        // TODO: remove event listeners here

      });

    });

    describe('Interaction-level mutability', function () {

      it('calling .open() modifies the current lightbox instance', function () {

        base = local['lightbox'].attach('demo-one');
        composed = base.open();
        expect(base.config.isOpen).toBeTruthy();
        expect(base.config.context).toEqual('system');

      });

      it('calling .close() modifies the current lightbox instance', function () {

        base = local['lightbox'].attach('demo-one');
        composed = base.close();
        expect(base.config.isOpen).toBeFalsy();
        expect(base.config.context).toEqual('system');

      });

    });

  });

  describe('Observers', function () {

    it('event callbacks are executed', function () {

      var callbackOpen = jasmine.createSpy('opened');
      var callbackClose = jasmine.createSpy('closed');
      var callbackAttach = jasmine.createSpy('attached');

      base = local['lightbox']
        .on('open', callbackOpen)
        .on('close', callbackClose)
        .on('attach', callbackAttach)
        .attach('observers-one');

      base.open().close();

      expect(callbackOpen).toHaveBeenCalled();
      expect(callbackClose).toHaveBeenCalled();
      expect(callbackAttach).toHaveBeenCalled();

    });

  });

  describe('DOM interaction', function () {

    it('calling .open() opens the lightbox', function () {

      var lightbox = local['lightbox'].attach('demo-one');
      lightbox.open();

      var lightboxElement = document.querySelector('.demo-one-lightbox');
      expect(lightboxElement.classList.contains('lightbox-open')).toBeTruthy();

    });

    it('attaching to a non-existent DOM node throws an error', function () {

      var lightbox = local['lightbox']
      expect(function () {
        lightbox.attach('non-existent');
      }).toThrow(new Error('The lightbox content cannot be found.'))

    })

    it('opening a lightbox before it has been attached to a DOM node throws an error', function () {

      var lightbox = local['lightbox'];
      expect(function () {
        lightbox.open();
      }).toThrow(new Error('You cannot assign an interaction state to a lightbox that isnt\'t attached to a DOM node'));

    });

    it('closing a lightbox before it has been attached to a DOM node throws an error', function () {

      var lightbox = local['lightbox'];
      expect(function () {
        lightbox.close();
      }).toThrow(new Error('You cannot assign an interaction state to a lightbox that isnt\'t attached to a DOM node'));

    });

    it('specifying a non-existent DOM node that acts as a DOMActivation control throws an error', function () {

      var lightbox = local['lightbox'].settings({ DOMActivation: true })
      expect(function () {
        lightbox.attach('demo-three')._buildDOM()
      }).toThrow(new Error('The DOMActivation control cannot be found. Check a DOM node exists that has a [data-lightbox-activation-control] attribute whose value corresponds to the ID of the lightbox content'));

    });

    it('clicking the activating element opens the lightbox', function () {

      var lightbox = local['lightbox'];
      lightbox.settings({ DOMActivation: true }).attach('demo-two')
      var activatingElement = document.querySelector('[data-lightbox-activation-control="demo-two"]');
      activatingElement.click();
      var overlay = document.querySelector('.demo-two-lightbox');
      expect(overlay.classList.contains('lightbox-open')).toBeTruthy();

    });

    it('all element states associated with opening a lightbox are removed once the close animation has finished', function (done) {

      var lightbox = local['lightbox'];
      lightbox
        .attach('dom-interaction-one')
        .open()
        .close();

      var visibility = [];
      var overlay = document.querySelector('.dom-interaction-one-lightbox');
      console.log(overlay.classList)
      var checkVisibility = setInterval(function() {
        var visible = false
        if (visibility.length === 10) {
          clearInterval(checkVisibility);
          done()
          //console.log(visibility)
        }
        console.log(overlay.classList);
        if (overlay.classList.contains('lightbox-open')) {
          visible = true;
        }
        visibility.push(visible)
      }, 100)

    })

    //it('clicking the overlay closes the lightbox', function () {

    //  var lightbox = local['lightbox'];
    //  lightbox.attach('demo-two')
    //  var overlay = document.querySelector('.demo-two-lightbox');

    //});

  });

  it('version is attached', function () {
    expect(local['lightbox'].version).toBeDefined();
  });

});
