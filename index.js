/*!
 * js-code-context <https://github.com/tunnckoCore/js-code-context>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */
(function() {
  'use strict';

  var syncResult = [];

  function parseCodeContextSync(context, line) {
    var done = function(err, res) {
      syncResult = err ? [err] : res;
    };
    if (!line) {
      line = done;
    }
    parseCodeContext(context, line, done);
    return syncResult;
  }
  function parseCodeContext(context, line, cback) {
    var content, result = [];
    if (typeof line === 'number') {
      content = [context.split('\n')[line]];
    } else if (!cback && typeof line === 'function') {
      cback = line;
      content = context.split('\n');
    } else {
      content = context.split('\n');
    }

    each(content, function(item, index, done) {
      index = index;
      // function statement
      if (/^function ([\w$]+) *\((.*)\)/.exec(item)) {
        result.push({
          type: 'function',
          name: RegExp.$1,
          clean: RegExp.$1,
          args: RegExp.$2,
          string: RegExp.$1 + '()',
          full: RegExp.$1 + '(' + RegExp.$2 + ')'
        });
        // function expression
      } else if (/^var *([\w$]+)[ \t]*=[ \t]*function[\s\w]*\((.*)\)/.exec(item)) {
        result.push({
          type: 'function',
          name: RegExp.$1,
          clean: RegExp.$1,
          args: RegExp.$2,
          string: RegExp.$1 + '()',
          full: RegExp.$1 + '(' + RegExp.$2 + ')'
        });
        // prototype method
      } else if (/^([\w$]+)\.prototype\.([\w$]+)[ \t]*=[ \t]*function[\s\w]*\((.*)\)/.exec(item)) {
        result.push({
          type: 'method',
          constructor: RegExp.$1,
          cons: RegExp.$1,
          name: RegExp.$2,
          clean: RegExp.$1 + '.prototype.' + RegExp.$2,
          args: RegExp.$3,
          string: RegExp.$1 + '.prototype.' + RegExp.$2 + '()',
          full: RegExp.$1 + '.prototype.' + RegExp.$2 + '(' + RegExp.$3 + ')',
        });
        // prototype property
      } else if (/^([\w$]+)\.prototype\.([\w$]+)[ \t]*=[ \t]*([^\n;]+)/.exec(item)) {
        result.push({
          type: 'property',
          constructor: RegExp.$1,
          cons: RegExp.$1,
          name: RegExp.$2,
          value: RegExp.$3,
          string: RegExp.$1 + '.prototype.' + RegExp.$2
        });
        // method
      } else if (/^([\w$.]+)\.([\w$]+)[ \t]*=[ \t]*function/.exec(item)) {
        result.push({
          type: 'method',
          receiver: RegExp.$1,
          name: RegExp.$2,
          clean: RegExp.$1 + '.' + RegExp.$2,
          args: RegExp.$3,
          string: RegExp.$1 + '.' + RegExp.$2 + '()',
          full: RegExp.$1 + '.' + RegExp.$2 + '(' + RegExp.$3 + ')',
        });
        // property
      } else if (/^([\w$]+)\.([\w$]+)[ \t]*=[ \t]*([^\n;]+)/.exec(item)) {
        result.push({
          type: 'property',
          receiver: RegExp.$1,
          name: RegExp.$2,
          value: RegExp.$3,
          string: RegExp.$1 + '.' + RegExp.$2
        });
        // declaration
      } else if (/^var +([\w$]+)[ \t]*=[ \t]*([^\n;]+)/.exec(item)) {
        result.push({
          type: 'declaration',
          name: RegExp.$1,
          value: RegExp.$2,
          string: RegExp.$1
        });
      }
      done();
    }, function(err) {
      if (err) {return cback(err);}
    });
    return cback(null, result);
  }

  function once(fn) {
    var called = false;
    if (typeof fn !== 'function') {
      throw new TypeError('Must be fuction.');
    }
    return function() {
      if (called) {
        throw new Error('Callback already called.');
      }
      called = true;
      fn.apply(this, arguments);
    };
  }

  function each(arr, next, cb) {
    var failed = false;
    var count = 0;
    cb = cb || function() {};
    if (!Array.isArray(arr)) {
      throw new TypeError('First argument must be an array');
    }
    if (typeof next !== 'function') {
      throw new TypeError('Second argument must be a function');
    }
    var len = arr.length;
    if (!len) {
      return cb();
    }

    function callback(err) {
      if (failed) {
        return;
      }
      if (err !== undefined && err !== null) {
        failed = true;
        return cb(err);
      }
      if (++count === len) {
        return cb();
      }
    }
    for (var i = 0; i < len; i++) {
      next(arr[i], i, once(callback));
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = parseCodeContext;
    module.exports.sync = parseCodeContextSync;
  } else {
    window.jsCodeContext = parseCodeContext;
  }
})();
