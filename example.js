var RandomOrgClient = require('./index');

var JsonApi = new RandomOrgClient();
JsonApi
  .apikey("test-api-key")
  .post('https://api.random.org/json-rpc/1/invoke', function (response) {
  console.log(response);
});
