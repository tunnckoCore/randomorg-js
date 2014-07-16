var RandomJs = require('../index');
var JsonApi = new RandomJs();

var result = JsonApi
  .apikey('3873f558-60bd-4697-ad98-eb3617df0427')
  .headers({'User-Agent': 'tunnckoCore/RandomJS'})
  .method('generateStrings')
  .params({n:4,length:11})
  .post(function(xhrOrError, stream, body) {
    //in browser:
    //first argument is xhr object
    //second argument is null

    //in node:
    //first argument is error object or null
    //second argument is stream
    console.log('==START==')
    console.log('==xhrOrError==')
    console.log(xhrOrError)
    console.log('==stream==')
    console.log(stream)
    console.log('==body==')
    console.log(body)
    console.log('==END==')
  });
