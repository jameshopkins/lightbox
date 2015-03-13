# Lightbox #
[![CircleCI](https://circleci.com/gh/jameshopkins/lightbox/tree/master.svg?style=svg)](https://circleci.com/gh/jameshopkins/lightbox/tree/master)

> An implementation comprising chainable lightbox customisations, resulting in a highly flexible way of composing new lightboxes from pre-existing ones.

## Examples ##

### Basic, single instance ###
* can be activated by an element
* includes a boolean flag describing bookmarkable state
* includes a callback that's fired when the lightbox is opened
* attaches to a DOM node with an ID attribute value of 'demo-one'

```js
lightbox
  .settings({ toggle: true, loadPersist: true })
  .on('open', function() {
    console.log('it has opened!')
  })
  .attach('demo-one')
```

### Instance composition ###
It's easy to compose lightbox from another predefined instance.
* includes a callback that's fired when the lightbox becomes attached to it's DOM node

```js
var lightbox
  .on('attach', function() {
    console.log('it has become attached!');
  })
```
* compose instance from `lightbox`
* includes a callback that's fired when the lightbox becomes attached to it's DOM node
* opens upon instantiation

```js
var contextSpecificLightbox = lightbox
  .on('attach', function() {
    console.log('the new instance has become attach!');
  })
  .open()
```


## API ##

### Defining settings ###

#### .settings([options]) ####
```js
options {Object} Optional
```
The `options` object can include the following key/value combinations:
* `DOMActivation {Boolean}`: Indicates that there's an associated DOM node that, when clicked, will invoke the lightbox. This DOM node must have a `data-lightbox-activation-control` attribute value that corresponds to the `id` value of the element that contains the lightbox content.
* `loadPersist {Boolean}`: hello

### Observer ###

#### .on(eventType, callback) ####
```js
eventType {String} attach | open | close
callback {Function} The callback that will be invoked when the specified eventType has been invoked
```
Allows you to register a callback when that internal event has been fired.

You can include multiple instances

### DOM interaction ###

#### .attach(id) ####
```js
id {String} The ID of the content that the lightbox will encapsulate
```
Creates the resulting DOM instantiation based on predefined configuration set earlier in the chain. For this reason, this method should only be called at the end of a chain.

#### .open([emitter]) ####
Opens
```js
emitter {String}, Optional, Default: system
```

#### .close([emitter]) ####
