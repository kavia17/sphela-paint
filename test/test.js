require([
  'base',
  'main',
  'router',
  'route',
  'canvas_container',
  'canvas_model',
  'control',
  'registry'
], function(base) {
  QUnit.testDone(function() {
    // Clean up all HTML for the test.
    $('#test').html('');
  });
  QUnit.start();
});
