define([
    '../js/lib/module/side_controls/control'
  ], function(Control) {
  var control, actionSpy, name, states, defaultState, testControl;
  QUnit.module('Control', {
    setup: function() {
      $('#test').html('<div class="test-control"></div>');
      testControl = $('.test-control').get(0);
      name = 'foo';
      Control.setControlNameOnElement(name, testControl);
      actionSpy = sinon.spy();
      states = [
        'apple',
        'orange',
        'banana'
      ];
      defaultState = 'orange';
      control = new Control(name, actionSpy, states, defaultState);
    },
    teardown: function() {
    }
  });
  QUnit.test('Control should exist', function() {
    QUnit.ok(Control, 'Control exists.');
  });
  QUnit.test('Control should take a name.', function() {
    QUnit.strictEqual(control.name(),
      name, 'name() should return the right name.');
  });
  QUnit.test('Control should take a default state.', function() {
    QUnit.strictEqual(control.state(),
      defaultState, 'state() should return the defaultState.');
  });
  QUnit.test('Control should be able to add a state.', function() {
    control.setState('apple');
    QUnit.strictEqual(control.state(),
      'apple', 'state() should return the new state.');
    control.setState('banana');
    QUnit.strictEqual(control.state(),
      'banana', 'state() should be able to change state.');
  });
  QUnit.test('Control should not be able to take an invalid state.',
    function() {
      control.setState('bar');
      QUnit.strictEqual(control.state(),
        defaultState, 'state() should not have added an invalid state.');
  });
  QUnit.test('Control should not call action until clicked.', function() {
    QUnit.strictEqual(actionSpy.callCount, 0, 'Should not have called action.');
  });
  QUnit.test('Control should call its action when clicked.', function() {
    control.click();
    QUnit.ok(actionSpy.calledOnce, 'Should have called action after click.');
  });
  QUnit.test('Control should initially set a data attribute on an element.',
      function() {
      QUnit.strictEqual($('[data-state="' + defaultState + '"]').length, 1,
        'Should have set the default state on the attribute.');
  });
  QUnit.test('Control should update the data attribute on an element.',
    function() {
      control.setState('apple');
      QUnit.strictEqual($('[data-state="' + defaultState + '"]').length, 0,
        'Should not have the default state on data attribute.');
  });
  QUnit.test('Control should update data attribute on an element.', function() {
    control.setState('banana');
    QUnit.strictEqual($('[data-state="banana"]').length, 1,
      'Should have set the banana state on the data attribute.');
  });
  QUnit.test('Control should have a getControlNameFromElement static method.',
    function() {
      QUnit.strictEqual(
        Control.getControlNameFromElement(testControl),
        name, 'Should have returned the correct control name.');
  });
  QUnit.test('Control have a setControlNameOnElement static method.',
    function() {
      Control.setControlNameOnElement('bar', testControl);
      QUnit.strictEqual(
        Control.getControlNameFromElement(testControl),
        'bar', 'Should have returned the correct control name.');
  });
  QUnit.test('Contro action should be passed an instance of the control.',
    function() {
      control.click();
      QUnit.ok(actionSpy.calledWith(control),
        'Should have been called with control.');
  });
});
