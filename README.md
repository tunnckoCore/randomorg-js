# Random.Org JSON-RPC API in JS

[![Build Status](https://travis-ci.org/tunnckoCore/randomorg-js.png)](https://travis-ci.org/tunnckoCore/randomorg-js) [![Dependencies Status](https://david-dm.org/tunnckoCore/randomorg-js/status.svg)](https://david-dm.org/tunnckoCore/randomorg-js)

> [Random.org](http://random.org) JSON-RPC API in Javascript. For browser and Node.

## Install

```
npm install randomorg-js
```

## Usage
```js
var RandomOrgClient = require('./index');

var JsonApi = new RandomOrgClient();
JsonApi
  .apikey("test-api-key")
  .post('https://api.random.org/json-rpc/1/invoke', function (response) {
  console.log(response);
});
```

## Test, Bench, Example
First run `npm install` before run anything.
```
npm test
npm start
```

## Credit

|[![Charlike Mike Reagent](https://avatars2.githubusercontent.com/u/5038030?s=120)](https://github.com/tunnckoCore)|
|---|
|[George Yanev](https://github.com/tunnckoCore) (creator, npm)|


## License
The MIT License (MIT) [@tunnckoCore](https://twitter.com/tunnckoCore)