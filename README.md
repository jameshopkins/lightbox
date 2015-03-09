[lightbox]({{ git.io-URL }})  [![Circle CI](https://circleci.com/gh/{{ git.username }}/lightbox/tree/master.svg?style=svg)](https://circleci.com/gh/{{ git.username }}/lightbox/tree/master)
========================

> Please take a look at the [demo page]({{ git.io-URL }})

## Quick-Start

Include the lightbox assets in your project either as **Static Resources**

```html
<link rel="stylesheet" href="http://web-toolkit.global.sky.com/components/lightbox/0.0.1/styles/lightbox.min.css" />
<script type="text/javascript" src="http://web-toolkit.global.sky.com/components/lightbox/0.0.1/scripts/lightbox.min.js"></script>
```

or alternatively, **Via Bower**

 * Run: `bower install --save-dev bskyb-lightbox`
 * Include Sass: `@import 'bower_components/bskyb-lightbox/src/styles/lightbox';`
 * Include JS: `var lightbox = require('../../bower_components/bskyb-lightbox/src/scripts/lightbox');`


#### Dependencies

This component relies on other components and you must also include these in your project.

 * [Dependency Name](https://github.com/skyglobal/DependencyName)

#### Developer Notes

Choose a type of lightbox component and copy the relevant html.
 * [example](demo/_includes/example.html)
 * [example](demo/_includes/example.html),

## Contribution

Components depends on collaboration between developers. Contributions of any size are actively encouraged.

To see how to build this component locally, read the [contribution guidelines](CONTRIBUTING.md).

## Browser Support

(To support IE8 please add [ployfill](https://github.com/skyglobal/polyfill) to your site)

 * IE9 +
 * Safari 7 +
 * Latest Firefox
 * Latest Chrome
 * Latest Mobile Safari
 * Latest Mobile Chrome
