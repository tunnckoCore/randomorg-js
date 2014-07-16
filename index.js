/*!
 * randomorg-js <https://github.com/tunnckoCore/randomorg-js>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */
(function() {
  'use strict';
  var isBrowser = false;
  var isNode = false;
  var Request;
  var defaultApiKey = '6b1e65b9-4186-45c2-8981-b77a9842c4f0';

  if (typeof module !== 'undefined' && module.exports) {
    isNode = true;
    //extend = require('extend');
    Request = require('request');
  } else {
    isBrowser = true;
  }

  var methodDefaults = {
    generateIntegers: {
      apiKey: defaultApiKey,
      n: 3,
      min: 1,
      max: 5
    },
    generateDecimalFractions: {
      apiKey: defaultApiKey,
      n: 3,
      decimalPlaces: 8
    },
    generateGaussians: {
      apiKey: defaultApiKey,
      n: 3,
      mean: 400,
      standardDeviation: 100,
      significantDigits: 8
    },
    generateStrings: {
      apiKey: defaultApiKey,
      n: 3,
      length: 400,
        characters: 'abcdefghijklmnopqrstuvwxyz'
    },
    generateUUIDs: {
      apiKey: defaultApiKey,
      n: 3
    },
    generateBlobs: {
      apiKey: defaultApiKey,
      n: 3,
      size: 1024
    }
  };

  /**
   * Initialize a new `RandomJs` instance with `body` object.
   * See also https://api.random.org/json-rpc/1/basic
   * 
   * @param  {Object}    [body]      body object that will send to api
   * @param  {Function}  [statusCb]  callback that recieves request status
   * @return {RandomJs}
   */

  function RandomJs(body, statusCb) {
    if (!(this instanceof RandomJs)) {return new RandomJs(body, statusCb);}
    body = body || {};
    this._request = {};
    this._response = {};
    this._callback = function() {};

    this._url = 'https://api.random.org/json-rpc/1/invoke';

    this._request.url = this._url;
    this._request.json = true;

    this._request.body = {};
    this._request.body.jsonrpc = body.jsonrpc || '2.0';
    this._request.body.method = body.method || 'generateIntegers';
    this._request.body.params = body.params || methodDefaults.generateIntegers;
    this._request.body.id = body.id || (0 | Math.random() * 1000);
     
    this._body = this._request.body;

    if (statusCb) {statusCb(this._request);}
    return this;
  }

  /**
   * Get status of request that will be send to API
   *
   * @param   {Function}  [statusCb]  callback that recieves request status
   * @return  {RandomJs|Object} returns self or RandomJs._request object
   */

  RandomJs.prototype.request = function(statusCb) {
    if (statusCb) {
      statusCb(this._request);
      return this;
    }
    else {
      return this._request;
    }
  };

  /**
   * Set your API key
   *
   * @param   {String}    <apikey>    your api key with that you will auth to api
   * @param   {Function}  [statusCb]  callback that recieves request status
   * @return  {RandomJs}
   */

  RandomJs.prototype.apikey = function(value, statusCb) {
    this._body.params.apiKey = apikey;
    if (statusCb) {statusCb(this._request);}
    return this;
  };

  /**
   * Set version of Random.Org JSON RPC API
   *
   * @param   {String}    <value>     default `'2.0'`
   * @param   {Function}  [statusCb]  callback that recieves request status 
   * callback that recieves request status
   * @return  {RandomJs}
   */

  RandomJs.prototype.jsonrpc = function(value, statusCb) {
    this._body.jsonrpc = jsonrpc;
    if (statusCb) {statusCb(this._request);}
    return this;
  };

  /**
   * Set which rpc method to use (see https://api.random.org/json-rpc/1/basic)
   * 
   * @param   {String}    <value>     default `'generateIntegers'`
   * @param   {Function}  [statusCb]  callback that recieves request status
   * @return  {RandomJs}
   */

  RandomJs.prototype.method = function(value, statusCb) {
    if (methodDefaults.hasOwnProperty(method)) {
      methodDefaults[method].apiKey = this._body.params.apiKey;
      this._body.method = method;
      this._body.params = methodDefaults[method];
    }
    if (statusCb) {statusCb(this._request);}
    return this;
  };

  /**
   * Set params object that will be attached to the request body
   *
   * @param   {Object}    <value>     default, `generateIntegers`'s defaults - 
   * see [index.js#L24-L29](./index.js#L24-L29)
   * @param   {Function}  [statusCb]  callback that recieves request status
   * @return  {RandomJs}
   */

  RandomJs.prototype.params = function(value, statusCb) {
    if (typeof params === 'object') {
      for (var key in params) {
        if (this._body.params.hasOwnProperty(key) && this._body.params !== params[key]) {
          this._body.params[key] = params[key];
        }
      }
    }
    if (statusCb) {statusCb(this._request);}
    return this;
  };

  /**
   * Set id request body
   *
   * @param   {Object}    <value>     default `(0 | Math.random() * 1000)`
   * @param   {Function}  [statusCb]  callback that recieves request status
   * @return  {RandomJs}
   */

  RandomJs.prototype.id = function(value, statusCb) {
    this._body.id = id;
    if (statusCb) {statusCb(this._request);}
    return this;
  };

  /**
   * Set url to the api endpoint it's
   * always https://api.random.org/json-rpc/1/invoke
   * 
   * @param   {String}    <value>     default `https://api.random.org/json-rpc/1/invoke`
   * @param   {Function}  [statusCb]  callback that recieves request status
   * @return  {RandomJs}
   */

  RandomJs.prototype.url = function(value, statusCb) {
    this._url = url;
    if (statusCb) {statusCb(this._request);}
    return this;
  };

  /**
   * Short-hand for `.url`
   * 
   * @param   {String}    <value>     same as [#url](#randomjs-url)
   * @param   {Function}  [statusCb]  callback that recieves request status
   * @return  {RandomJs}
   */

  RandomJs.prototype.uri = function(value, statusCb) {
    this.url(uri, statusCb);
    return this;
  };

  /**
   * Callback that will handle the response.
   * You must provide function with 3 arguments that are
   *
   * - `xhrOrErr` **{Object}** if browser, will be `xhr request`, else `error`
   * - `stream` **{Stream}** if browser, will be `null`, else [`request's stream`][request-url]
   * - `body` **{Object}** always, response body object of the request
   * 
   * @param   {Function}  <fn>        done(xhrOrErr, stream, body)
   * @param   {Function}  [statusCb]  callback that recieves request status
   * @return  {RandomJs}
   */

  RandomJs.prototype.callback = function(fn, statusCb) {
    this._callback = fn;
    if (statusCb) {statusCb(this._request);}
    return this;
  };

  /**
   * Headers that will send with request.
   * Always append `{'Content-Type': 'application/json'}` header to others.
   * 
   * @param   {Object}    <object>    default `{'Content-Type': 'application/json'}`
   * @param   {Function}  [statusCb]  callback that recieves request status
   * @return  {RandomJs}
   */

  RandomJs.prototype.headers = function(object, statusCb) {
    this._request.headers = headers;
    if (statusCb) {statusCb(this._request);}
    return this;
  };

  /**
   * Send request to the JSON-RPC API
   * 
   * @param   {Boolean|Function}  [done]      if `false`, will use [#callback](#randomjs-callback)
   * @param   {Function}          [statusCb]  callback that recieves request status
   * @return  {RandomJs}
   */

  RandomJs.prototype.post = function(done, statusCb) {
    var cb = done || this._callback, finish = false;
    if (isNode) {
      Request.post(this._request, cb);
    } else if (isBrowser) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', this._request.url, true);
      for (var header in this._request.headers) {
        xhr.setRequestHeader(header, this._request.headers[header]);
      }
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(this._request.body));

      this._response = xhr;
      xhr.onreadystatechange = function () {
        if (!finish && xhr.readyState === 4) {
          cb(xhr, null, JSON.parse(xhr.responseText));
          finish = true;
        }
      }
    }
    if (statusCb) {statusCb(this._request);}
  };


  if (isNode) {
    module.exports = RandomJs;
  } else {
    window.RandomJs = RandomJs;
  }
})();
