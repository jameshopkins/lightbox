# Lightbox #
[![CircleCI](https://circleci.com/gh/jameshopkins/lightbox/tree/master.svg?style=svg)](https://circleci.com/gh/jameshopkins/lightbox/tree/master)

> An implementation comprising chainable lightbox customisations, resulting in a highly flexible way of composing new lightboxes from pre-existing ones.

## Examples ##

### Basic, single instance ###
* can be activated by an element
* includes a callback that's fired when the lightbox is opened
* attaches to a DOM node with an ID attribute value of 'demo-one'

```js
lightbox
  .settings({ DOMActivation: true })
  .on('open', function() {
    console.log('it has opened!')
  })
  .attach('demo-one')
```

### Instance composition ###
It's easy to compose lightbox from another predefined instance.
* includes a callback that's fired when the lightbox becomes attached to it's DOM node

```js
var myLightbox = lightbox
  .on('attach', function() {
    console.log('it has become attached!');
  })
```
* compose instance from `lightbox`
* includes a callback that's fired when the lightbox becomes attached to it's DOM node
* opens upon instantiation

```js
var contextSpecificLightbox = myLightbox
  .on('attach', function() {
    console.log('the new instance has become attach!');
  })
  .attach('demo-two')
  .open()
```


## API ##

### Defining settings ###

#### .settings([options]) ####
```js
options {Object} Optional
```
The `options` hash can include the following key/value combinations:
* `DOMActivation {Boolean}`: Indicates that there's an associated DOM node that, when clicked, will invoke the lightbox. This DOM node must have a `data-lightbox-activation-control` attribute value that corresponds to the `id` value of the element that contains the lightbox content.

### Observer ###

#### .on(eventType, callback) ####
```js
eventType {String} attach | open | close
callback {Function} The callback that will be invoked when the specified eventType has been invoked
```
Allows you to register a callback against the specified `eventType`. The current lightbox instance is provided as the callback parameter, giving you access to all the current settings (at that point in the chain) and methods.

You can of course register multiple callbacks against a single `eventType` throughout your composition chain. These will be executed in the order they're registered.

### DOM interaction ###

#### .attach(id) ####
```js
id {String} The ID of the content that the lightbox will encapsulate
```
Creates the resulting DOM instantiation based on predefined configuration set earlier in the chain. For this reason, this method should only be called at the end of a chain.

#### .open([context]) ####
```js
context {String}, Optional, Default: system
```
Opens the lightbox. The `context` gives context as to which lightbox component called the method. Internal components currently supported are:
* _Close button_: `close`
* _Viewport overlay_: `overlay`

In this way, when calling `.open()` yourself, have the chance to include a custom context flag. For example:

```js
lightbox
  .on('open', function(lightbox) {
    console.log('See! You can ' + lightbox.config.context);
  })
  .on('attach', function(lightbox) {
    instance.open('do-it-yourself');
  })
  .attach('demo-two')
```

#### .close([context]) ####
```js
context {String}, Optional, Default: system
```
Closes the lightbox. The `context` gives context as to which lightbox component called the method. Internal components currently supported are:
