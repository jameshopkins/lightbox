# Lightbox #
[![Circle CI](https://circleci.com/gh/jameshopkins/lightbox/tree/master.svg?style=svg)](https://circleci.com/gh/jameshopkins/lightbox/tree/master)

> An implementation comprising chainable operations, each representing a lightbox customisation, resulting .

## API ##

### .attach(id) ###
    @id {String} The ID of the content that the lightbox will encapsulate

### .open([emitter]) ###
    emitter {String}, Optional, Default: system

### .close([emitter]) ###
### .on(eventType, callback) ###
### .settings() ###

## Examples ##

### Basic, single instance ###
* can be activated by an element
* includes a boolean flag describing bookmarkable state
* includes a callback that's fired when the lightbox is opened
* attaches to a DOM node with an ID attribute value of 'demo-one'
        lightbox
          .settings({ toggle: true, loadPersist: true })
          .on('open', function() {
            console.log('it has opened!')
          })
          .attach('demo-one')

### Instance composition ###
It's easy to compose lightbox from another predefined instance.
* includes a callback that's fired when the lightbox becomes attached to it's DOM node

      var lightbox
        .on('attach', function() {
          console.log('it has become attached!');
        })
* compose instance from `lightbox`
* includes a callback that's fired when the lightbox becomes attached to it's DOM node
* opens upon instantiation

      var contextSpecificLightbox = lightbox
        .on('attach', function() {
          console.log('the new instance has become attach!');
        })
        .open()
