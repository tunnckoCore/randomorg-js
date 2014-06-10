(function (global, module) {

  var exports = module.exports;

  /**
   * Exports.
   */
  var isNode = typeof process !== 'undefined' && process.versions && !!process.versions.node;
  var isBrowser = typeof window !== 'undefined';

  module.exports = RandomOrgClient;
  RandomOrgClient.RandomOrgJs = RandomOrgJs;

  function RandomOrgClient () {
    return new RandomOrgJs();
  }

  function RandomOrgJs() {
  	this.request = {
  		"jsonrpc": "2.0",
  		"method": "generateIntegers",
  		"params": {
  			"apiKey": "00000000-0000-0000-0000-000000000000",
  			"n": 1,
  			"min": 1,
  			"max": 10,
  			"replacement": true,
  			"base": 10
  		},
  		"id": (0 | Math.random() * 1000)
  	};
  	this.response = {};
    return this;
  }
  RandomOrgJs.prototype.apikey = function(val) {
  	this.request.params['apiKey'] = val
  	return this;
  }
  RandomOrgJs.prototype.jsonrpc = function(val) {
  	this.request.jsonrpc = val
  	return this;
  }
  RandomOrgJs.prototype.method = function(val) {
  	this.request.method = val
  	return this;
  }
  RandomOrgJs.prototype.params = function(val) {
  	this.request.params = this.extend(this.request.params, val)
  	return this;
  }
  RandomOrgJs.prototype.id = function(val) {
  	this.request.id = val
  	return this;
  }
  RandomOrgJs.prototype.options = function(val) {
  	this.request = this.extend(this.request, val)
  	return this;
  }
  RandomOrgJs.prototype.post = function(url, obj, done) {
  	if (!arguments[2]) done = obj, obj = {
  		method: 'POST',
  		body: this.request,
  		headers: {
  			'Content-Type': 'application/json'
  		}
  	};
  	if (isNode && !isBrowser) {
  		var requestify = require('requestify'), self = this;
  		requestify.request(url, obj).then(function(response) {
        self.response = response
  			done(response)
  		});
  	} else {
  		var xhr = new XMLHttpRequest();
  		xhr.open('POST', url, true);
  		xhr.setRequestHeader('Content-type', 'application/json');
  		xhr.send(JSON.stringify(this.request));

  		this.response = xhr
  		return done(xhr, this)
  	}
  }
  RandomOrgJs.prototype.extend = function(target, source) {
    target = target || {};
    for (var prop in source) {
      if (typeof source[prop] === 'object') {
        target[prop] = this.extend(target[prop], source[prop]);
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }

  if ('undefined' != typeof window) {
    window.RandomOrgClient = module.exports;
  }
})(
    this
  , 'undefined' != typeof module ? module : {exports: {}}
);
