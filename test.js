/*!
 * randomorg-js <https://github.com/tunnckoCore/randomorg-js>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

const test = require('mukla')
const RandomOrgJS = require('./dist/randomorg.common.js')

const apiKey = process.env.RANDOM_ORG_JS_APIKEY
const params = {
  apiKey: apiKey,
  n: 6,
  min: 1,
  max: 6
}

test('should generate integers with random generated id', (done) => {
  RandomOrgJS.generateIntegers(params, (e, response) => {
    test.strictEqual(typeof response.result, 'object')
    done()
  })
})

test('should generate integers with custom id which should match', function (done) {
  RandomOrgJS.generateIntegers(444444, params, (er, res) => {
    test.strictEqual(res.id, 444444)
    done()
  })
})

test('should expose RandomOrg function which accepts id and return methods', function (done) {
  const methods = RandomOrgJS.RandomOrg(555)
  methods.generateIntegers(params, (e, res) => {
    test.strictEqual(res.id, 555)
    done()
  })
})
