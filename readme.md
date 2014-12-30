## [![npm][npmjs-img]][npmjs-url] [![mit license][license-img]][license-url] [![build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![deps status][daviddm-img]][daviddm-url]

> Streaming Random.org JSON-RPC Javascript API - for node, command line (cli) and the browser.

## Install
```bash
npm install randomorg-js
npm test
```


## Include in html
> After that you can use directly `new RandomJs()` class.

```html
<script src="https://cdn.rawgit.com/tunnckoCore/randomorg-js/master/dist/randomorg-js.js"></script>
```


## Usage in node.js
> For more use-cases see the [tests](./test.js) and [examples](./examples)

```js
var RandomJs = require('randomorg-js');
var randomJs = new RandomJs();

var result = randomJs
  .apikey('6b1e65b9-4186-45c2-8981-b77a9842c4f0') // your apikey here
  .headers({'User-Agent': 'https://github.com/tunnckoCore/randomorg-js'})
  .method('generateStrings')
  .params({n:4,length:11})
  .post(function(error, stream, body) {
    console.log('==START==')
    console.log('==error==')
    console.log(error)
    console.log('==stream==')
    console.log(stream)
    console.log('==body==')
    console.log(body)
    console.log('==END==')
  });
```

## Usage in browser
```js
var randomJs = new RandomJs();

var result = randomJs
  .apikey('6b1e65b9-4186-45c2-8981-b77a9842c4f0') // your apikey here
  .method('generateStrings')
  .params({n:4,length:11})
  .post(function(xhr, stream, body) {
    console.log('==START==')
    console.log('==xhr==')
    console.log(xhr)
    console.log('==stream==')
    console.log(stream)
    console.log('==body==')
    console.log(body)
    console.log('==END==')
  });

```


## API
### [RandomJs(body)](./index.js#L66)
> Initialize a new `RandomJs` instance with `[body]` (optional) object.  
See also https://api.random.org/json-rpc/1/basic

**members**
- [request(statusCb)](#request)
- [apikey(value, statusCb)](#apikey)
- [jsonrpc(value, statusCb)](#jsonrpc)
- [method(value, statusCb)](#method)
- [params(value, statusCb)](#params)
- [id(value, statusCb)](#id)
- [url(value, statusCb)](#url)
- [uri(value, statusCb)](#uri)
- [callback(fn, statusCb)](#callback)
- [headers(object, statusCb)](#headers)
- [post(done, statusCb)](#post)

**params**
- `[body]` **{Object}** body object that will send to api
- `[statusCb]` **{Function}** callback that recieves request status
- `return` **{RandomJs}**


#### [.request](./index.js#L99)
> Get status of request that will be send to API

**params**
- `[statusCb]` **{Function}** callback that recieves request status
- `return` **{RandomJs|Object}** returns self or RandomJs._request object


#### [.apikey](./index.js#L115)
> Set your API key

**params**
- `<apikey>` **{String}** your api key with that you will auth to api
- `[statusCb]` **{Function}** callback that recieves request status
- `return` **{RandomJs}**


#### [.jsonrpc](./index.js#L132)
> Set version of Random.Org JSON RPC API

**params**
- `<value>` **{String}** default `'2.0'`
- `[statusCb]` **{Function}** callback that recieves request status
- `return` **{RandomJs}**


#### [.method](./index.js#L148)
> Set which rpc method to use (see https://api.random.org/json-rpc/1/basic)

**params**
- `<value>` **{String}** default `'generateIntegers'`
- `[statusCb]` **{Function}** callback that recieves request status
- `return` **{RandomJs}**


#### [.params](./index.js#L169)
> Set params object that will be attached to the request body

**params**
- `<value>` **{Object}** [see defaults at index.js#L21-55](./index.js#L21-55), `generateIntegers`'s defaults
- `[statusCb]` **{Function}** callback that recieves request status
- `return` **{RandomJs}**


#### [.id](./index.js#L209)
> Set id request body

**params**
- `<value>` **{Object}** default `(0 | Math.random() * 1000)`
- `[statusCb]` **{Function}** callback that recieves request status
- `return` **{RandomJs}**


#### [.url](./index.js#L209)
> Set url to the api endpoint it's always `https://api.random.org/json-rpc/1/invoke`

**params**
- `<value>` **{String}** default `https://api.random.org/json-rpc/1/invoke`
- `[statusCb]` **{Function}** callback that recieves request status
- `return` **{RandomJs}**


#### [.uri](./index.js#L225)
> Short-hand for `.url`

**params**
- `<value>` **{String}** same as [.url](#url)
- `[statusCb]` **{Function}** callback that recieves request status
- `return` **{RandomJs}**


#### [.callback](./index.js#L243)
> Callback that will handle the response.

**params**
- `<fn>` **{Function}** cb(`xhrOrErr`, `stream`, `body`)
- `[statusCb]` **{Function}** callback that recieves request status
- `return` **{RandomJs}**

> You must provide function with 3 arguments that are

- `xhrOrErr` **{Object}** if browser, will be `xhr request`, else `error`
- `stream` **{Stream}** if browser, will be `null`, else [`request's stream`][request-url]
- `body` **{Object}** always, response body object of the request


#### [.headers](./index.js#L260)
> Headers that will send with request.  
Always append `{'Content-Type': 'application/json'}` header to others.

**params**
- `<object>` **{Object}** default `{'Content-Type': 'application/json'}`
- `[statusCb]` **{Function}** callback that recieves request status
- `return` **{RandomJs}**


#### [.post](./index.js#L276)
> Send request to the JSON-RPC API

**params**
- `[done]` **{Boolean|Function}** if `false`, will use [.callback](#callback)
- `[statusCb]` **{Function}** callback that recieves request status
- `return` **{RandomJs}**



## Author
**Charlike Mike Reagent**
+ [gratipay/tunnckoCore][author-gratipay]
+ [twitter/tunnckoCore][author-twitter]
+ [github/tunnckoCore][author-github]
+ [npmjs/tunnckoCore][author-npmjs]
+ [more ...][contrib-more]


## License [![MIT license][license-img]][license-url]
Copyright (c) 2014 [Charlike Mike Reagent][contrib-more], [contributors][contrib-graf].  
Released under the [`MIT`][license-url] license.


[npmjs-url]: http://npm.im/randomorg-js
[npmjs-img]: https://img.shields.io/npm/v/randomorg-js.svg?style=flat&label=randomorg-js

[coveralls-url]: https://coveralls.io/r/tunnckoCore/randomorg-js?branch=master
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/randomorg-js.svg?style=flat

[license-url]: https://github.com/tunnckoCore/randomorg-js/blob/master/license.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat

[travis-url]: https://travis-ci.org/tunnckoCore/randomorg-js
[travis-img]: https://img.shields.io/travis/tunnckoCore/randomorg-js.svg?style=flat

[daviddm-url]: https://david-dm.org/tunnckoCore/randomorg-js
[daviddm-img]: https://img.shields.io/david/tunnckoCore/randomorg-js.svg?style=flat

[author-gratipay]: https://gratipay.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-npmjs]: https://npmjs.org/~tunnckocore

[contrib-more]: http://j.mp/1stW47C
[contrib-graf]: https://github.com/tunnckoCore/randomorg-js/graphs/contributors

***

_Powered and automated by [readdirp + hogan.js](https://github.com/tunnckoCore), December 30, 2014_