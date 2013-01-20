(function() {
  var route;
  QUnit.module('Canvas Container', {
    setup: function() {
    },
    teardown: function() {
    }
  });
  QUnit.test('sp.container should exist', function() {
    QUnit.ok(sp.container, 'sp.container exists.');
  });
  QUnit.test('routerInit should be a function', function() {
    QUnit.ok(_.isFunction(sp.container.routerInit),
      'sp.container.routerInit is a function.');
  });
  QUnit.test('clientInit is a function', function() {
    QUnit.ok(_.isFunction(sp.container.clientInit),
      'sp.container.clientInit is a function.');
  });
  QUnit.test('serverInit is a function', function() {
    QUnit.ok(_.isFunction(sp.container.serverInit),
      'sp.container.serverInit is a function.');
  });
  QUnit.test('routerInit returns an array with a function and path',
    function() {
      var results;
      results = sp.container.routerInit();
      QUnit.ok(_.isFunction(results[0]),
        'routerInit did not provide a function.');
      QUnit.ok(_.isString(results[1]),
        'routerInit did not provide a string path.');
  });
}());



