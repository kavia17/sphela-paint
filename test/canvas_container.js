define([
    'underscore',
    '../js/lib/module/canvas_container/canvas_container'
  ], function(_, container) {
  QUnit.module('Canvas Container', {
    setup: function() {
    },
    teardown: function() {
    }
  });
  QUnit.test('routerInit should be a function', function() {
    QUnit.ok(_.isFunction(container.routerInit),
      'container.routerInit is a function.');
  });
  QUnit.test('clientInit is a function', function() {
    QUnit.ok(_.isFunction(container.clientInit),
      'container.clientInit is a function.');
  });
  QUnit.test('serverInit is a function', function() {
    QUnit.ok(_.isFunction(container.serverInit),
      'container.serverInit is a function.');
  });
  QUnit.test('routerInit returns an array with a function and path',
    function() {
      var results;
      results = container.routerInit();
      QUnit.ok(_.isFunction(results[0]),
        'routerInit did not provide a function.');
      QUnit.ok(_.isString(results[1]),
        'routerInit did not provide a string path.');
  });
  QUnit.test('routeManager is a function', function() {
    QUnit.ok(_.isFunction(container.routeManager),
      'container.serverInit is a function.');
  });
  QUnit.test('routeManager calls setHandler on route', function() {
    var route;
    route = {setHandler: sinon.spy()};
    container.routeManager(route);
    QUnit.ok(route.setHandler.calledOnce, 'Called setHandler.');
  });
  QUnit.test('routeManager passes in a stateHandler', function() {
    var route;
    QUnit.expect(2);
    route = {
      setHandler: function(func) {
        QUnit.ok(_.isFunction(func), 'passed in a function');
        QUnit.equal(func, container.stateHandler,
          'passed in a stateHandler.');
      }
    };
    container.routeManager(route);
  });
  QUnit.test('routeManager returns route', function() {
    var route;
    route = {setHandler: function() {}};
    QUnit.strictEqual(container.routeManager(route), route,
      'routeManager returned route.');
  });
});



