define([
  'underscore',
  './session',
  '../js/lib/module/side_controls/color',
  '../js/lib/module/side_controls/toggle'
  ], function(_, Session, Color, Toggle) {
  var red, blue, green;
  QUnit.module('Color', {
    setup: function() {
      red = new Color('red', Session);
      blue = new Color('blue', Session);
      green = new Color('green', Session);
    },
    teardown: function() {
    }
  });
  QUnit.test('Color should exist.', function() {
    QUnit.ok(Color, 'Color should exist.');
  });
  QUnit.test('Inherits from Toggle', function() {
    QUnit.ok(red instanceof Toggle, 'Should be an instance of a Toggle.');
  });
  QUnit.test('Takes a name', function() {
    QUnit.strictEqual(red.name(), 'red', 'Should have the right color name.');
  });
  QUnit.test('Sets session color', function() {
    red.click();
    QUnit.strictEqual(Session.get(Color.SESSION_KEY), 'red');
    blue.click();
    QUnit.strictEqual(Session.get(Color.SESSION_KEY), 'blue');
    green.click();
    QUnit.strictEqual(Session.get(Color.SESSION_KEY), 'green');
  });
  QUnit.test('Turns off all other colors', function() {
    red.click();
    QUnit.strictEqual(red.state(), Toggle.state.ON,
      'Should have turned on red.');
    blue.click();
    QUnit.strictEqual(red.state(), Toggle.state.OFF,
      'Should have turned off red.');
    QUnit.strictEqual(blue.state(), Toggle.state.ON,
      'Should have turned on blue.');
    green.click();
    QUnit.strictEqual(blue.state(), Toggle.state.OFF,
      'Should have turned off blue.');
    QUnit.strictEqual(green.state(), Toggle.state.ON,
      'Should have turned on green.');
  });
});


