(function() {
  var router, routeStore;

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

  QUnit.module('sp.Router', {
    setup: function() {
      router = new sp.Router();
      routeStore = sp.Route;
    },
    teardown: function() {
      sp.Route = routeStore;
    }
  });
  QUnit.test('sp.Router should exist', function() {
    QUnit.ok(sp.Router, 'sp.Router does not exist.');
  });
  QUnit.test('Setting a default route should work.', function() {
    var route;
    route = createMockRoute();
    router.setDefaultRoute(route);
    router.runRoute();
    QUnit.ok(route.runSpy.calledOnce, 'Default route was not called.');
  });
  QUnit.test('initModule should run routeManager.', function() {
    var routeManager;
    routeManager = sinon.spy();
    router.initModule(routeManager, 'foo');
    QUnit.ok(routeManager.calledOnce, 'routeManager was not called.');
  });
  QUnit.test('routeManager should get an instance of sp.Route.', function() {
    var routeInstance;
    function routeManager(r) {
      routeInstance = r;
    }
    router.initModule(routeManager, 'foo');
    QUnit.ok(routeInstance instanceof sp.Route,
      'routeInstance should be an instance of sp.Route');
  });
  QUnit.test('getRoute should return a route when given a path.', function() {
    var routes, MockRoute;
    MockRoute = function (path) {this.path = path;};
    sp.Route = MockRoute;
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
      router.initModule(stubManager, path);
    });
    _.each(routes, function(routeObj, path) {
      _.each(routeObj.paths, function(fullPath) {
        var route;
        route = router.getRoute(fullPath);
        if (!route) {
          return;
        }
        QUnit.strictEqual(router.getRoute(path).path, path,
          'Did not get the right route.');
      });
    });
  });
  QUnit.test('getRoute should return null when it cannot find a route.',
    function() {
      QUnit.strictEqual(router.getRoute('foo'), null,
        'getRoute should return null when it cannot find a route.');
  });
  QUnit.test('runRoute should should pass state to route.',
    function() {
      var MockRoute, testPath, testState;
      QUnit.expect(1);
      MockRoute = function () {};
      testPath = 'foo/bar';
      testState = {foo: 'bar'};
      MockRoute.prototype.run = function(path, state) {
        QUnit.strictEqual(state, testState,
          'run should get the state from runRoute');
      };
      sp.Route = MockRoute;
      router.initModule(stubManager, 'foo');
      router.runRoute(testPath, testState);
  });
  QUnit.test('runRoute should should pass path to route.',
    function() {
      var MockRoute, testPath, testState;
      QUnit.expect(1);
      MockRoute = function () {};
      testPath = 'foo/bar';
      testState = {foo: 'bar'};
      MockRoute.prototype.run = function(path, state) {
        QUnit.strictEqual(path, testPath,
          'run should get the path from runRoute');
      };
      sp.Route = MockRoute;
      router.initModule(stubManager, 'foo');
      router.runRoute(testPath, testState);
  });
  QUnit.test(
    'runRoute should should pass in an empty object when given undefined state',
    function() {
      var MockRoute, testPath, testState;
      QUnit.expect(1);
      MockRoute = function () {};
      MockRoute.prototype.run = function(path, state) {
        QUnit.ok(_.isEmpty(state),
          'run should get an empty state from runRoute');
      };
      sp.Route = MockRoute;
      router.initModule(stubManager, 'foo');
      router.runRoute('foo');
  });
  QUnit.test('runRoute should pass in an empty string to default route',
    function() {
      var MockRoute, testPath, testState, route;
      QUnit.expect(1);
      MockRoute = function () {};
      MockRoute.prototype.run = function(path, state) {
        QUnit.strictEqual(path, '',
          'run should get an empty string from runRoute');
      };
      function routeManager(r) {
        route = r;
      }
      sp.Route = MockRoute;
      router.initModule(routeManager, 'foo');
      router.setDefaultRoute(route);
      router.runRoute();
  });
  QUnit.test('initModule should pass in the path to route',
    function() {
      var MockRoute, testpath;
      QUnit.expect(1);
      testpath = 'testpath';
      MockRoute = function(path) {
        QUnit.strictEqual(path, testpath, 'route should get path');
      };
      sp.Route = MockRoute;
      router.initModule(stubManager, testpath);
  });
  QUnit.test('initModule should pass in the pathParser to route',
    function() {
      var MockRoute, path, testParser;
      QUnit.expect(1);
      path = 'testpath';
      testParser = /foo/;
      MockRoute = function(path, parser) {
        QUnit.strictEqual(parser, testParser, 'route should get parser');
      };
      sp.Route = MockRoute;
      router.initModule(stubManager, path, testParser);
  });
  QUnit.test('initModule should pass in a reference to the router',
    function() {
      QUnit.expect(1);
      function routeManager(route, testRouter) {
        QUnit.strictEqual(testRouter, router,
          'routeManager should get the router');
      }
      router.initModule(routeManager, 'foo');
  });
  QUnit.test('currentState returns history.context', function() {
    var historyStore;
    historyStore = history;
    history = {context: {foo: 'bar'} };
    QUnit.strictEqual(sp.Router.currentState(), history.context,
      'currentState should return history.context');
    history = historyStore;
  });
}());

