# randomorg-js [![NPM version](https://img.shields.io/npm/v/randomorg-js.svg?style=flat)](https://www.npmjs.com/package/randomorg-js) [![NPM monthly downloads](https://img.shields.io/npm/dm/randomorg-js.svg?style=flat)](https://npmjs.org/package/randomorg-js) [![npm total downloads][downloads-img]][downloads-url]

> The official Random.org API client for Node.js and the browser

[![codeclimate][codeclimate-img]][codeclimate-url] 
[![codestyle][standard-img]][standard-url] 
[![linux build][travis-img]][travis-url] 
[![windows build][appveyor-img]][appveyor-url] 
[![codecov][coverage-img]][coverage-url] 
[![dependency status][david-img]][david-url]

You might also be interested in [always-done](https://github.com/hybridables/always-done#readme).

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Related](#related)
- [Contributing](#contributing)
- [Building docs](#building-docs)
- [Running tests](#running-tests)
- [Author](#author)
- [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

## Install
Install with [npm](https://www.npmjs.com/)

```
$ npm install randomorg-js --save
```

or install using [yarn](https://yarnpkg.com)

```
$ yarn add randomorg-js
```

Or in the browser directly using the [unpkg](https://unpkg.com) CDN:

```html
<script src="https://unpkg.com/randomorg-js/dist/randomorg.min.js"></script>
<script>
  var randomorg = RandomOrg
  console.log(randomorg)
  console.log(randomorg.generateIntegers)

  // see more below in that README
</script>
```

_Please don't use the `https://unpkg.com/randomorg-js` shortcut that Unpkg allows you, because it will give you the CommonJS / Nodejs (with `module.exports`) build, that you can't use in the browser._

## Usage
> For more use-cases see the [tests](test.js)

All methods from the [API documentation](https://api.random.org/json-rpc/1/) - both ["Basic Methods"](https://api.random.org/json-rpc/1/basic) and ["Digital Signing"](https://api.random.org/json-rpc/1/signing) -  are exposed as named exports. In addition, it also has `request` method, which has signature `(methodName, params, callback)` and one `RandomOrg` function which has `(id)` signature and it returns an object with same methods.

**ES6**

Each method has `(id, params, callback)` signature, where `id` is optional.

```js
import {
  generateIntegers,
  generateDecimalFractions,
  generateGaussians,
  generateStrings,
  generateUUIDs,
  generateBlobs,
  getUsage,
  generateSignedIntegers,
  generateSignedDecimalFractions,
  generateSignedGaussians,
  generateSignedStrings,
  generateSignedUUIDs,
  generateSignedBlobs,
  verifySignature,

  // special
  request,
  RandomOrg
} from 'randomorg-js'
```

**CommonJS / Node.JS**

Notice that Node > 4 is required for `destructing` feature.

```js
const {
  generateIntegers,
  generateDecimalFractions,
  generateGaussians,
  generateStrings,
  // ...
  generateSignedBlobs,
  verifySignature,

  // special
  request,
  RandomOrg
} = require('randomorg-js')
```

So you simply can just use old way

```js
var randomorg = require('randomorg-js')

console.log(randomorg)
console.log(randomorg.generateIntegers)
console.log(randomorg.generateDecimalFractions)
console.log(randomorg.verifySignature)
console.log(randomorg.request)
console.log(randomorg.RandomOrg)
// and etc.
```

**Example**

```js
const params = {
  apiKey: 'your api key',
  n: 6,
  min: 1,
  max: 6
}

generateIntegers(params, (err, response) => {
  // there may have `err` or `response.error`
  console.log(err || response.error)

  // response is exactly what the API spec
  // defines as response object
  console.log(response)
  console.log(response.id)
  console.log(response.result)
})
```

Or using the `request` method

```js
request('generateSignedStrings', {
  n: 8,
  length: 10,
  characters: 'ab!~cdefg+_-hijk@lmn#$%opqr^stuvwxyz',
}, (err, response) => {
  console.log(err, response)
})
```

By default the package exports all methods with randomly generated `id`. To change that, the onoe way can be to add `id` as first argument to each method e.g. `generateStrings(id, params, callback)`; or the second variant is to call the `RandomOrg(id)` which returns the same methods and they will use the defined `id` from the constructor.

```js
const { RandomOrg } = require('randomorg-js')

const random = RandomOrg(123555)

random.generateSignedBlobs({
 apiKey: 'your api key here',
 and: 'other params for that method'
}, (er, { id, result }) => {
  // response always has the same ID what
  // user has provided
  console.log(id) // => 123555
  console.log(result) // => random Signed Blobs
})

// but you still can provide
// different `id` to same method
random.generateSignedBlobs(4444, params, (e, { id }) => {
  console.log(id) // => 4444
})

// or to some other method
random.generateIntegers(2938742, params, (e, { id }) => {
  console.log(id) // => 2938742
})
```

## API

TODO

## Related
- [always-done](https://www.npmjs.com/package/always-done): Handle completion and errors with elegance! Support for streams, callbacks, promises, child processes, async/await and sync functions. A drop-in replacement… [more](https://github.com/hybridables/always-done#readme) | [homepage](https://github.com/hybridables/always-done#readme "Handle completion and errors with elegance! Support for streams, callbacks, promises, child processes, async/await and sync functions. A drop-in replacement for [async-done][] - pass 100% of its tests plus more")
- [minibase](https://www.npmjs.com/package/minibase): Minimalist alternative for Base. Build complex APIs with small units called plugins. Works well with most of the already existing… [more](https://github.com/node-minibase/minibase#readme) | [homepage](https://github.com/node-minibase/minibase#readme "Minimalist alternative for Base. Build complex APIs with small units called plugins. Works well with most of the already existing [base][] plugins.")
- [try-catch-core](https://www.npmjs.com/package/try-catch-core): Low-level package to handle completion and errors of sync or asynchronous functions, using [once][] and [dezalgo][] libs. Useful for and… [more](https://github.com/hybridables/try-catch-core#readme) | [homepage](https://github.com/hybridables/try-catch-core#readme "Low-level package to handle completion and errors of sync or asynchronous functions, using [once][] and [dezalgo][] libs. Useful for and used in higher-level libs such as [always-done][] to handle completion of anything.")

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/randomorg-js/issues/new).  
Please read the [contributing guidelines](CONTRIBUTING.md) for advice on opening issues, pull requests, and coding standards.  
If you need some help and can spent some cash, feel free to [contact me at CodeMentor.io](https://www.codementor.io/tunnckocore?utm_source=github&utm_medium=button&utm_term=tunnckocore&utm_campaign=github) too.

**In short:** If you want to contribute to that project, please follow these things

1. Please DO NOT edit [README.md](README.md), [CHANGELOG.md](CHANGELOG.md) and [.verb.md](.verb.md) files. See ["Building docs"](#building-docs) section.
2. Ensure anything is okey by installing the dependencies and run the tests. See ["Running tests"](#running-tests) section.
3. Always use `npm run commit` to commit changes instead of `git commit`, because it is interactive and user-friendly. It uses [commitizen][] behind the scenes, which follows Conventional Changelog idealogy.
4. Do NOT bump the version in package.json. For that we use `npm run release`, which is [standard-version][] and follows Conventional Changelog idealogy.

Thanks a lot! :)

## Building docs
Documentation and that readme is generated using [verb-generate-readme][], which is a [verb][] generator, so you need to install both of them and then run `verb` command like that

```
$ npm install verbose/verb#dev verb-generate-readme --global && verb
```

_Please don't edit the README directly. Any changes to the readme must be made in [.verb.md](.verb.md)._

## Running tests
Clone repository and run the following in that cloned directory

```
$ npm install && npm test
```

## Author
**Charlike Mike Reagent**

+ [github/tunnckoCore](https://github.com/tunnckoCore)
+ [twitter/tunnckoCore](https://twitter.com/tunnckoCore)
+ [codementor/tunnckoCore](https://codementor.io/tunnckoCore)

## License
Copyright © 2014, 2017, [Charlike Mike Reagent](https://i.am.charlike.online). Released under the [MIT license](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.4.1, on February 12, 2017._  
_Project scaffolded using [charlike][] cli._

[always-done]: https://github.com/hybridables/always-done
[async-done]: https://github.com/gulpjs/async-done
[base]: https://github.com/node-base/base
[charlike]: https://github.com/tunnckocore/charlike
[commitizen]: https://github.com/commitizen/cz-cli
[dezalgo]: https://github.com/npm/dezalgo
[once]: https://github.com/isaacs/once
[standard-version]: https://github.com/conventional-changelog/standard-version
[verb-generate-readme]: https://github.com/verbose/verb-generate-readme
[verb]: https://github.com/verbose/verb

[always-done]: https://github.com/hybridables/always-done
[async-done]: https://github.com/gulpjs/async-done
[base]: https://github.com/node-base/base
[charlike]: https://github.com/tunnckocore/charlike
[commitizen]: https://github.com/commitizen/cz-cli
[dezalgo]: https://github.com/npm/dezalgo
[once]: https://github.com/isaacs/once
[standard-version]: https://github.com/conventional-changelog/standard-version
[verb-generate-readme]: https://github.com/verbose/verb-generate-readme
[verb]: https://github.com/verbose/verb

[downloads-url]: https://www.npmjs.com/package/randomorg-js
[downloads-img]: https://img.shields.io/npm/dt/randomorg-js.svg

[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/randomorg-js
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/randomorg-js.svg

[travis-url]: https://travis-ci.org/tunnckoCore/randomorg-js
[travis-img]: https://img.shields.io/travis/tunnckoCore/randomorg-js/master.svg?label=linux

[appveyor-url]: https://ci.appveyor.com/project/tunnckoCore/randomorg-js
[appveyor-img]: https://img.shields.io/appveyor/ci/tunnckoCore/randomorg-js/master.svg?label=windows

[coverage-url]: https://codecov.io/gh/tunnckoCore/randomorg-js
[coverage-img]: https://img.shields.io/codecov/c/github/tunnckoCore/randomorg-js/master.svg

[david-url]: https://david-dm.org/tunnckoCore/randomorg-js
[david-img]: https://img.shields.io/david/tunnckoCore/randomorg-js.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
