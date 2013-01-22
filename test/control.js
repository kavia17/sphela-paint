(function() {
 var control, actionSpy, name, states, defaultState;
  QUnit.module('Control', {
    setup: function() {
      $('#test').html('<div class="foo"></div>');
      name = 'foo';
      actionSpy = sinon.spy();
      states = [
        'apple',
        'orange',
        'banana'
      ];
      defaultState = 'orange';
      control = new sp.controls.Control(name, actionSpy, states, defaultState);
    },
    teardown: function() {
      $('#test').html('');
    }
  });
  QUnit.test('sp.container.Control should exist', function() {
    QUnit.ok(sp.controls.Control, 'sp.controls.Control exists.');
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
  QUnit.test('Control should initially set a class on an element.', function() {
    QUnit.strictEqual($('.state-' + defaultState).length, 1,
      'Should have set the default state as a class.');
  });
  QUnit.test('Control should remove a class on an element.', function() {
    control.setState('apple');
    QUnit.strictEqual($('.state-' + defaultState).length, 0,
      'Should not have the default state as a class.');
  });
  QUnit.test('Control should add a class on an element.', function() {
    control.state('banana');
    QUnit.strictEqual($('.state-banana').length, 0,
      'Should have set the default state as a class.');
  });
}());
