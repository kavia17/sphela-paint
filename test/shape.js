define([
  'underscore',
  './session',
  '../js/lib/module/side_controls/shape',
  '../js/lib/module/side_controls/control'
  ], function(_, Session, Shape, Control) {
  var shape;
  QUnit.module('Shape', {
    setup: function() {
      shape = new Shape(Session);
    },
    teardown: function() {
    }
  });
  QUnit.test('Shape should exist.', function() {
    QUnit.ok(Shape, 'Shape should exist.');
  });
  QUnit.test('Inherits from Control', function() {
    QUnit.ok(shape instanceof Control, 'Should be an instance of Control');
  });
});
