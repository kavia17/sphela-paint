define([
  '../js/lib/client/main'
], function(client) {
  var Router, R;
  /** 
   * Mock Router
   */
  function createRouter() {
    var Router, createdSpy, initModuleSpy, runRouteSpy, currentStateSpy;
    createdSpy = sinon.spy();
    initModuleSpy = sinon.spy();
    runRouteSpy = sinon.spy();
    currentStateSpy = sinon.spy();
    Router = function() {
      createdSpy();
    };
    Router.prototype.initModule = function() {
      initModuleSpy();
    };
    Router.prototype.runRoute = function() {
      runRouteSpy();
    };
    Router.currentState = function() {
      currentStateSpy();
    };
    Router.createdSpy = createdSpy;
    Router.initModuleSpy = initModuleSpy;
    Router.runRouteSpy = runRouteSpy;
    Router.currentStateSpy = currentStateSpy;
    return Router;
  }
  function createMockModule(routed) {
    var mockModule, initSpy, initRouterSpy;
    initSpy = sinon.spy();
    initRouterSpy = sinon.spy();
    mockModule = {
      clientInit: function() {
        initSpy();
      },
      routerInit: function() {
        initRouterSpy();
      },
      initSpy: initSpy,
      initRouterSpy: initRouterSpy,
      routed: routed
    };
    return mockModule;
  }
  QUnit.module('client.main', {
    setup: function() {
      R = createRouter();
    }
  });
  QUnit.test('client.main should exist', function() {
    QUnit.ok(client.main, 'client.main does not exist.');
  });
  QUnit.test('client.main should create an instance of Router',
    function() {
      client.main([], R);
      QUnit.ok(R.createdSpy.calledOnce, 'Instance of Router not created.');
  });
  QUnit.test(
    'client.main should iterate through modules and call their init.',
    function() {
      QUnit.expect(2);
      var m1, m2;
      m1 = createMockModule();
      m2 = createMockModule();
      client.main([m1, m2], R);
      QUnit.ok(m1.initSpy.calledOnce, 'First module init not called.');
      QUnit.ok(m2.initSpy.calledOnce, 'Second module init not called.');
  });
  QUnit.test('client.main should call r.runRoute', function() {
    client.main([], R);
    QUnit.ok(R.runRouteSpy.calledOnce, 'Did not call runRoute');
  });
  QUnit.test('client.main should call r.initModule for every routed module.',
    function() {
      var m1, m2, m3, m4;
      m1 = createMockModule();
      m2 = createMockModule(true);
      m3 = createMockModule();
      m4 = createMockModule(true);
      client.main([m1, m2, m3, m4], R);
      QUnit.strictEqual(R.initModuleSpy.callCount, 2, 'Wrong call count.');
  });
  QUnit.test('client.main should call r.currentState.',
    function() {
      client.main([], R);
      QUnit.ok(R.currentStateSpy.calledOnce, 'Did not call current state once.');
  });
  QUnit.test('client.main should call init for every module.', function() {
    var modules, i;
    QUnit.expect(4);
    modules = [
      createMockModule(),
      createMockModule(true),
      createMockModule(),
      createMockModule(true)
    ];
    client.main(modules, R);
    for (i = 0; i < modules.length; i++) {
      QUnit.ok(modules[i].initSpy.calledOnce,
        'Init spy for ' + i + ' not called.');
    }
  });
  QUnit.test('client.main should call routerInit for every routed module.',
    function() {
      var modules, expected, i;
      QUnit.expect(4);
      modules = [
        createMockModule(),
        createMockModule(true),
        createMockModule(),
        createMockModule(true)
      ];
      expected = [
        false,
        true,
        false,
        true
      ];
      client.main(modules, R);
      for (i = 0; i < modules.length; i++) {
        // Explicit boolean check to avoid undefined expecteds.
        if (expected[i] === true) {
          QUnit.ok(modules[i].initRouterSpy.calledOnce,
          'Init router spy for ' + i + ' not called.');
        } else if (expected[i] === false) {
          QUnit.ok(!modules[i].initRouterSpy.calledOnce,
          'Init router spy for ' + i + ' called.');
        }
      }
  });
});
