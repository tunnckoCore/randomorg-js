var isNode = typeof process !== 'undefined' && process.versions && !!process.versions.node;
var isBrowser = typeof window !== 'undefined';
if (isNode && !isBrowser) {
  var RandomOrgClient = require('./index');
}

describe('Random.Org JsonRPC JS Api', function () {
  it('should #options sets request object', function(done) {
    var JsonApi = new RandomOrgClient();
    JsonApi.options({
      "jsonrpc": "2.0",
      "method": "generateStrings"
      // and etc...
    });
    JsonApi.request.should.be.an.Object;
    JsonApi.request.should.have.properties({
      "jsonrpc": "2.0",
      "method": "generateStrings"
    });
    done();
  });
  it('should #params sets request.params object', function(done) {
    var JsonApi = new RandomOrgClient();
    JsonApi.params({
      "n": 1,
      "min": 3,
      "max": 1000,
    });
    JsonApi.request.params.should.be.an.Object;
    JsonApi.request.params.should.have.properties({
      "n": 1,
      "min": 3,
      "max": 1000,
    });
    done();
  });
  it('should #apikey sets request.params.apiKey', function(done) {
    var JsonApi = new RandomOrgClient();
    JsonApi.apikey("test-random-org-apikey")
    JsonApi.request.params.apiKey.should.be.a.String;
    JsonApi.request.params.apiKey.should.equal('test-random-org-apikey');
    done();
  });
  it('should #jsonrpc sets request.jsonrpc', function(done) {
    var JsonApi = new RandomOrgClient();
    JsonApi.jsonrpc("1.1.2")
    JsonApi.request.jsonrpc.should.be.a.String;
    JsonApi.request.jsonrpc.should.equal('1.1.2');
    done();
  });
  it('should #method sets request.method', function(done) {
    var JsonApi = new RandomOrgClient();
    JsonApi.method("generateStrings")
    JsonApi.request.method.should.be.a.String;
    JsonApi.request.method.should.equal('generateStrings');
    done();
  });
  it('should #id sets request.id', function(done) {
    var JsonApi = new RandomOrgClient();
    JsonApi.id(1234567)
    JsonApi.request.id.should.be.a.Number;
    JsonApi.request.id.should.equal(1234567);
    done();
  });
  it('should support chaining and overwriting', function(done) {
    var JsonApi = new RandomOrgClient();
    JsonApi
      .id(1234)
      .options({
        "jsonrpc": "1.2.4",
        "apiKey": 'first-api-testkey',
        "id": 123,
        "params": {
          "n": 3,
          "min": 12,
          "max": 100
        }
      })
      .apikey('second-api-testkey')
      .jsonrpc('2.0')
      .params({
        "min": 5,
        "max": 20
      })
    JsonApi.request.should.be.an.Object;
    JsonApi.request.id.should.be.a.Number;
    JsonApi.request.id.should.be.equal(123);
    JsonApi.request.jsonrpc.should.be.a.String;
    JsonApi.request.jsonrpc.should.be.equal('2.0');
    JsonApi.request.params.should.be.an.Object;
    JsonApi.request.params.should.have.properties({
      "n": 3,
      "min": 5,
      "max": 20,
      "apiKey": "second-api-testkey"
    });
    done();
  });
});
