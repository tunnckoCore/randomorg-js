'use strict'

const buble = require('rollup-plugin-buble')
const zopfli = require('rollup-plugin-zopfli')
const uglify = require('rollup-plugin-uglify')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

let config = {
  entry: 'src/index.js'
}

if (process.env.BROWSER) {
  config = Object.assign(config, {
    dest: 'dist/randomorg.min.js',
    format: 'umd',
    moduleName: 'RandomOrg',
    useStrict: false,
    sourceMap: true,
    plugins: [
      resolve(),
      commonjs(),
      buble({
        target: {
          ie: '11',
          edge: '12',
          safari: '8',
          chrome: '48',
          firefox: '44'
        }
      }),
      uglify({ compress: { warnings: false } }),
      zopfli({ options: { numiterations: 1000 } })
    ]
  })
} else {
  config = Object.assign(config, {
    plugins: [
      buble({
        target: { node: '4' }
      })
    ],
    // treating the name `xhr` as external dependency
    external: [
      'xhr'
    ],
    // but instead `xhr` it will load `simple-get`
    // kinda just replaces the characters `xhr`
    // with the characters `simple-get`
    // @see `dist/randomorg.common.js` for example and proof
    paths: {
      xhr: 'simple-get'
    },
    targets: [
      { dest: 'dist/randomorg.common.js', format: 'cjs' },
      { dest: 'dist/randomorg.es.js', format: 'es' }
    ]
  })
}

module.exports = config
