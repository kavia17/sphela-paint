(function() {
  var controlStore, element, control, name, defaultState, states, action;
  defaultState = 'bar';
  states = ['apples', 'oranges', defaultState, 'banana'];
  QUnit.module('registry', {
    setup: function() {
      $('#test').html('<div class="test-control"></div>');
      name = 'foobar';
      element = $('.test-control').get(0);
      action = sinon.spy();
      control = sp.controls.registry.addControl(name, states, defaultState,
        element, action);
      controlStore = sp.controls.Control;
    },
    teardown: function() {
      sp.controls.registry.clear();
      sp.controls.Control = controlStore;
    }
  });
  QUnit.test('registry should exist', function() {
    QUnit.ok(sp.controls.registry, 'sp.controls.registry should exist.');
  });
  QUnit.test('registry should add and return a control.', function() {
    QUnit.ok(control instanceof sp.controls.Control,
      'Should have returned a control.');
  });
  QUnit.test('registry should return a control.', function() {
    control = sp.controls.registry.control(name);
    QUnit.strictEqual(control.name(), name, 'Should have returned a control.');
  });
  QUnit.test('Should not add a control if it already exists.', function() {
    QUnit.throws(function() {
      sp.controls.registry.addControl(name, ['bar'], 'bar', element,
        function() {});
    }, 'Should throw an error if adding a previously added control name.');
  });
  QUnit.test('Should call setControlNameOnElement on control.', function() {
    sinon.spy(sp.controls.Control, 'setControlNameOnElement');
      sp.controls.registry.addControl('test', ['bar'], 'bar', element,
        function() {});
    QUnit.ok(sp.controls.Control.setControlNameOnElement.calledOnce,
      'Should have called setControlNameOnElement.');
    sp.controls.Control.setControlNameOnElement.restore();
  });
  QUnit.test('Should have passed in the default state.', function() {
    QUnit.strictEqual(control.state(), defaultState,
      'Should have passed in the default state.');
  });
  QUnit.test('Should have passed in states.', function() {
    QUnit.expect(states.length);
    _.each(states, function(state) {
      control.setState(state);
      QUnit.strictEqual(control.state(), state, 'Should have set state.');
    });
  });
  QUnit.test('Should pass in the action.', function() {
    control.click();
    QUnit.ok(action.calledOnce, 'Should have called action spy.');
  });
  QUnit.test('Should return a control state by name.', function() {
    var firstControl, newControl, expectedControl;
    expectedControl = sp.controls.registry.addControl('test1', ['bar'], 'bar',
      function() {});
    firstControl = sp.controls.registry.control(name);
    QUnit.strictEqual(firstControl, control,
      'Should have returned the initial control.');
    newControl = sp.controls.registry.control('test1');
    QUnit.strictEqual(newControl, expectedControl,
      'Should have returned the new control.');
  });
  QUnit.test('Should return a null for state by invalid name.', function() {
    QUnit.ok(_.isNull(sp.controls.registry.control('does not exist.')),
      'Should return null for non-existant control.');
  });
  QUnit.test('Should set a control state by name.', function() {
    sp.controls.registry.setState(name, 'apples');
    QUnit.strictEqual(control.state(), 'apples',
      'Should have set control state by name.');
  });
  QUnit.test('Should call a control click by name.', function() {
    sp.controls.registry.click(name);
    QUnit.ok(action.calledOnce, 'Should have called action spy.');
  });
  QUnit.test('Should have a clear function.', function() {
    sp.controls.registry.clear();
    QUnit.ok(_.isNull(sp.controls.registry.control(name)),
      'Should have cleared registry.');
  });
}());
