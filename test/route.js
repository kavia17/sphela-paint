define([
  'underscore',
  '../js/lib/client/route'
  ], function(_, Route) {
  var r, regexp;
  regexp = /foo\/(\w+)\/([0-9]*)\/?/;
  QUnit.module('Route', {
    setup: function() {
      r = new Route('/foo', regexp); 
    },
    teardown: function() {
    }
  });
  QUnit.test('Route should exist', function() {
    QUnit.ok(Route, 'Route does not exist.');
  });
  QUnit.test('Should accept and call a state handler.', function() {
    var handler;
    handler = sinon.spy();
    r.setHandler(handler);
    r.run();
    QUnit.ok(handler.calledOnce, 'Handler should have been called.');
  });
  QUnit.test('Should correctly parse and pass args to handler.', function() {
    var testPaths;
    QUnit.expect(4);
    testPaths = [
      '/foo/bars234/2013/',
      '/foo/bars234/2013'
    ];
    r.setHandler(function (state, str, num) {
      QUnit.strictEqual(str, 'bars234', 'Should have received string.');
      QUnit.strictEqual(num, '2013', 'Should have received num.');
    });
    _.each(testPaths, function(path) {
      r.run(path, {});
    });
  });
  QUnit.test('Should pass in undefined if parser does not find matches.', 
    function() {
      var testPath;
      QUnit.expect(2);
      testPath = '/foo/';
      r.setHandler(function (state, str, num) {
        QUnit.strictEqual(str, undefined, 'Should have received undefined.');
        QUnit.strictEqual(num, undefined, 'Should have received undefined.');
      });
      r.run(testPath, {});
  });
  QUnit.test('Should pass state on to handler.', function() {
    var expectedState;
    QUnit.expect(1);
    expectedState = {foo: 'bar'};
    r.setHandler(function (state) {
      QUnit.strictEqual(state, expectedState, 'Should have received state');
    });
    r.run('foo', expectedState);
  });
  QUnit.test('Should accept a path as its first argument.', function() {
    QUnit.strictEqual(r.path(), '/foo',
      'Should have received a path and return it in the path method.');
  });
  QUnit.test('Should have parser method to return the parser.', function() {
    QUnit.strictEqual(r.parser(), regexp, 'Should return the regexp.');
  });
});


