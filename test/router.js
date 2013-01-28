define([
  'underscore',
  '../js/lib/client/route',
  '../js/lib/client/router'
], function(_, Route, Router) {
  var r, routeStore;

  function stubManager(x) {
    return x;
  }

  function createMockRoute() {
    var MockRoute, r, runSpy;
    runSpy = sinon.spy();
    MockRoute = function() {
    };
    MockRoute.prototype.run = function() {
      runSpy();
    };
    r = new MockRoute();
    r.runSpy = runSpy;
    return r;
  }

  QUnit.module('Router', {
    setup: function() {
      r = new Router();
      routeStore = Route;
    },
    teardown: function() {
      Route = routeStore;
    }
  });
  QUnit.test('Router should exist', function() {
    QUnit.ok(Router, 'Router does not exist.');
  });
  QUnit.test('Setting a default route should work.', function() {
    var route;
    route = createMockRoute();
    r.setDefaultRoute(route);
    r.runRoute();
    QUnit.ok(route.runSpy.calledOnce, 'Default route was not called.');
  });
  QUnit.test('initModule should run routeManager.', function() {
    var routeManager;
    routeManager = sinon.spy();
    r.initModule(routeManager, 'foo');
    QUnit.ok(routeManager.calledOnce, 'routeManager was not called.');
  });
  QUnit.test('routeManager should get an instance of Route.', function() {
    var routeInstance;
    function routeManager(r) {
      routeInstance = r;
    }
    r.initModule(routeManager, 'foo');
    QUnit.ok(routeInstance instanceof Route,
      'routeInstance should be an instance of Route');
  });
  QUnit.test('getRoute should return a route when given a path.', function() {
    var routes;
    QUnit.expect(4);
    routes = {
      '/foo/doo': {
        paths: [
          '/foo/doo/yoo',
          '/foo/doo/234/230'
        ]
      },
      '/sn234$asdfoo/bsoo': {
        paths: [
          '/sn234$asdfoo/bsoo/adsf',
          '/sn234$asdfoo/bsoo/a234234/sdsf'
        ]
      }
    };
    _.each(routes, function(routeObj, path) {
      r.initModule(stubManager, path);
    });
    _.each(routes, function(routeObj, path) {
      _.each(routeObj.paths, function(fullPath) {
        var route;
        route = r.getRoute(fullPath);
        if (!route) {
          return;
        }
        QUnit.strictEqual(r.getRoute(path).path(), path,
          'Did not get the right route.');
      });
    });
  });
  QUnit.test('getRoute should return null when it cannot find a route.',
    function() {
      QUnit.strictEqual(r.getRoute('foo'), null,
        'getRoute should return null when it cannot find a route.');
  });
  QUnit.test('runRoute should should pass state and path to route.',
    function() {
      var testPath, testState, mock;
      testPath = 'foo/bar';
      testState = {foo: 'bar'};
      mock = sinon.mock(Route.prototype);
      mock.expects('run').once().withExactArgs(testPath, testState);
      r.initModule(stubManager, 'foo');
      r.runRoute(testPath, testState);
      QUnit.ok(mock.verify(),
        'run should get the state and path from runRoute');
  });
  QUnit.test(
    'runRoute should should pass in an empty object when given undefined state',
    function() {
      var mock;
      mock = sinon.mock(Route.prototype);
      mock.expects('run').once().withExactArgs('foo', {});
      r.initModule(stubManager, 'foo');
      r.runRoute('foo');
      QUnit.ok(mock.verify(),
        'run should get an empty object from runRoute');
  });
  QUnit.test('runRoute should pass in an empty string to default route',
    function() {
      var route, mock;
      QUnit.expect(1);
      mock = sinon.mock(Route.prototype);
      mock.expects('run').once().withExactArgs('', {});
      function routeManager(r) {
        route = r;
      }
      r.initModule(routeManager, 'foo');
      r.setDefaultRoute(route);
      r.runRoute();
      QUnit.ok(mock.verify(), 'run should get an empty string from runRoute');
  });
  QUnit.test('initModule should pass in the path to route',
    function() {
      var testpath;
      testpath = 'testpath';
      r.initModule(stubManager, testpath);
      QUnit.strictEqual(r.getRoute(testpath).path(), testpath,
        'route should get path.');
  });
  QUnit.test('initModule should pass in the pathParser to route',
    function() {
      var path, testParser;
      path = 'testpath';
      testParser = /foo/;
      r.initModule(stubManager, path, testParser);
      QUnit.strictEqual(r.getRoute(path).parser(), testParser,
        'route should get parser.');
  });
  QUnit.test('initModule should pass in a reference to the router',
    function() {
      QUnit.expect(1);
      function routeManager(route, testRouter) {
        QUnit.strictEqual(testRouter, r,
          'routeManager should get the router');
      }
      r.initModule(routeManager, 'foo');
  });
  QUnit.test('currentState returns history.context', function() {
    var historyStore;
    historyStore = history;
    history = {context: {foo: 'bar'} };
    QUnit.strictEqual(Router.currentState(), history.context,
      'currentState should return history.context');
    history = historyStore;
  });
});

