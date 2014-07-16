# js-code-context
> RegExp expressions to parse javascript code context - for node and the browser.

[![NPM version][npmjs-shields]][npmjs-url]
[![Using ferver][ferver-img]][ferver-url]
[![Build Status][travis-img]][travis-url]


## Install [![Nodei.co stats][npmjs-install]][npmjs-url] 
> Install with [npm](https://npmjs.org)

```
$ npm install js-code-context
```


## Usage & Example
> For a more comprehensive examples, see the [tests](./test/index.js).

```js
var fs = require('fs');
var parseCodeContext = require('js-code-context');
var context = fs.readFileSync('./fixture.js','utf-8');

parseCodeContext(context, function(err, obj) {
  console.log(obj)
  //=> returns array of parsed objects
});

parseCodeContext(context, 6, function(err, obj) {
  console.log(obj)
  //=> returns array with 1 object for parsed 7th line of context
});

var response = parseCodeContext.sync(context, 6);
//=> returns array with 1 object for parsed 7th line of context
//=> or array with error object
```


## CLI
> CLI uses `.sync` method. But it's not so sync, if we must be honest - in fact it's asynchronous. It just returns resulted array in variable, not in callback.

```
$ npm install --global js-code-context
```
```
$ jsCodeContext --help

Options
  --help | -h  show help
  --line | -l  specify which line to parse
  --file | -f  file that want to parse

Example
  $ jsCodeContext -f ./test/fixture.js -l 6
  //=> array with one object
```


## Tests
> As usual - `npm test` **or** if you have [mocha][mocha-url] globally - `mocha`.

```
$ npm test
```


## Authors & Contributors [![author tips][author-gittip-img]][author-gittip]

**Charlike Mike Reagent**
+ [gittip/tunnckoCore][author-gittip]
+ [github/tunnckoCore][author-github]
+ [twitter/tunnckoCore][author-twitter]
+ [npmjs/tunnckoCore][author-npmjs]


## License [![MIT license][license-img]][license-url]
Copyright (c) 2014 [Charlike Mike Reagent][author-website], [contributors][contrib-url].  
Released under the [`MIT`][license-url] license.


[mocha-url]: https://github.com/visionmedia/mocha

[contrib-url]: https://github.com/tunnckoCore/js-code-context/graphs/contributors
[npmjs-url]: http://npm.im/js-code-context
[npmjs-shields]: http://img.shields.io/npm/v/js-code-context.svg
[npmjs-install]: https://nodei.co/npm/js-code-context.svg?mini=true

[license-url]: https://github.com/tunnckoCore/js-code-context/blob/master/license.md
[license-img]: http://img.shields.io/badge/license-MIT-blue.svg

[travis-url]: https://travis-ci.org/tunnckoCore/js-code-context
[travis-img]: https://travis-ci.org/tunnckoCore/js-code-context.svg?branch=master

[depstat-url]: https://david-dm.org/tunnckoCore/js-code-context
[depstat-img]: https://david-dm.org/tunnckoCore/js-code-context.svg

[author-gittip-img]: http://img.shields.io/gittip/tunnckoCore.svg
[author-gittip]: https://www.gittip.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore
[author-website]: http://www.whistle-bg.tk
[author-npmjs]: https://npmjs.org/~tunnckocore

[ferver-img]: http://img.shields.io/badge/using-ferver-585858.svg
[ferver-url]: https://github.com/jonathanong/ferver
