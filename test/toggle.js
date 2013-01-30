define([
  'underscore',
  '../js/lib/module/side_controls/toggle',
  '../js/lib/module/side_controls/control'
  ], function(_, Toggle, Control) {
  var toggle, name;
  QUnit.module('Toggle', {
    setup: function() {
       name = 'foo';
       toggle = new Toggle(name);
    },
    teardown: function() {
    }
  });
  QUnit.test('Toggle should exist', function() {
    QUnit.ok(Toggle, 'Toggle does not exist.');
  });
  QUnit.test('Toggle inherits from Control.', function() {
    QUnit.ok(toggle instanceof Control,
      'Toggle should be an instance of Control.');
  });
  QUnit.test('Toggle has on and off states.', function() {
    QUnit.strictEqual(Toggle.state.ON, 'on',
      'Toogle should have an on state.');
    QUnit.strictEqual(Toggle.state.OFF, 'off',
      'Toogle should have an off state.');
  });
  QUnit.test('Toggle takes a name.', function() {
    QUnit.strictEqual(toggle.name(), name,
      'toggle should have the right name.');
  });
  QUnit.test('Toggle takes a default state.', function() {
    toggle = new Toggle('foobar', Toggle.state.ON);
    QUnit.strictEqual(toggle.state(), Toggle.state.ON,
      'toggle should take the default state.');
  });
  QUnit.test('Toggle sets a default state if none is given.', function() {
    QUnit.strictEqual(toggle.state(), Toggle.state.OFF,
      'toggle should have a default state of OFF.');
  });
  QUnit.test('Toggle toggles on and off on action.', function() {
    QUnit.strictEqual(toggle.state(), Toggle.state.OFF,
      'toggle should be in default state of OFF.');
    toggle.click();
    QUnit.strictEqual(toggle.state(), Toggle.state.ON,
      'toggle should have toggled to ON.');
    toggle.click();
    QUnit.strictEqual(toggle.state(), Toggle.state.OFF,
      'toggle should have toggled to OFF.');
  });
});

