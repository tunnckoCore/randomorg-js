import req from 'simple-get';

/*!
 * randomorg-js <https://github.com/tunnckoCore/randomorg-js>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

// we use `simple-get` package and its `.concat` method in nodejs
// and distribute a bundle including `xhr` package, not the `simple-get`
const names = [
  'generateIntegers',
  'generateDecimalFractions',
  'generateGaussians',
  'generateStrings',
  'generateUUIDs',
  'generateBlobs',
  'getUsage',
  'generateSignedIntegers',
  'generateSignedDecimalFractions',
  'generateSignedGaussians',
  'generateSignedStrings',
  'generateSignedUUIDs',
  'generateSignedBlobs',
  'verifySignature'
];

function RandomOrg (id) {
  const request = (identifier) => (method, params, callback) => {
    /* istanbul ignore next */
    const postRequest = req.concat ? req.concat : req;
    const _id = identifier || id || (0 | Math.random() * 1000);

    postRequest({
      url: 'https://api.random.org/json-rpc/1/invoke',
      json: true,
      method: 'POST',
      body: {
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: _id
      }
    }, (err, resp, body) => {
      /* istanbul ignore next */
      if (err) { return callback(err) }
      callback(null, body);
    });
  };

  const methods = {};
  names.forEach((method) => {
    methods[method] = (identifier, params, callback) => {
      if (identifier && typeof identifier === 'object') {
        callback = params;
        params = identifier;
        identifier = false;
      }
      request(identifier)(method, params, callback);
    };
  });

  methods.request = request(id);
  methods.RandomOrg = RandomOrg;
  return methods
}

var index = RandomOrg();

export default index;
