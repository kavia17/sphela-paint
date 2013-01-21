(function() {
  var route;
  QUnit.module('sp.Route', {
    setup: function() {
      route = new sp.Route(/foo\/(\w+)\/([0-9]*)\/?/);
    },
    teardown: function() {
    }
  });
  QUnit.test('sp.Route should exist', function() {
    QUnit.ok(sp.Route, 'sp.Route does not exist.');
  });
  QUnit.test('Should accept and call a state handler.', function() {
    var handler;
    handler = sinon.spy();
    route.setHandler(handler);
    route.run();
    QUnit.ok(handler.calledOnce, 'Handler should have been called.');
  });
  QUnit.test('Should correctly parse and pass args to handler.', function() {
    var testPaths;
    QUnit.expect(4);
    testPaths = [
      '/foo/bars234/2013/',
      '/foo/bars234/2013'
    ];
    route.setHandler(function (state, str, num) {
      QUnit.strictEqual(str, 'bars234', 'Should have received string.');
      QUnit.strictEqual(num, '2013', 'Should have received num.');
    });
    _.each(testPaths, function(path) {
      route.run(path, {});
    });
  });
  QUnit.test('Should pass in undefined if parser does not find matches.', 
    function() {
      var testPath;
      QUnit.expect(2);
      testPath = '/foo/';
      route.setHandler(function (state, str, num) {
        QUnit.strictEqual(str, undefined, 'Should have received undefined.');
        QUnit.strictEqual(num, undefined, 'Should have received undefined.');
      });
      route.run(testPath, {});
  });
  QUnit.test('Should pass state on to handler.', function() {
    var expectedState;
    QUnit.expect(1);
    expectedState = {foo: 'bar'};
    route.setHandler(function (state) {
      QUnit.strictEqual(state, expectedState, 'Should have received state');
    });
    route.run('foo', expectedState);
  });
}());


