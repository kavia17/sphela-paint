requirejs.config({
  paths: {
    underscore: '../extern/underscore',
    jquery: '../extern/jquery'
  },
  shim: {
    underscore: {
      exports: '_'
    }
  }
});
require([
  'jquery',
  '../js/meteor',
  'base',
  'main',
  'router',
  'route',
  'canvas_container',
  'canvas_model',
  'control',
  'registry',
  'toggle',
  'color'
], function($, Meteor) {
  // $() is a shortcut for $(document).ready in jQuery.
  Meteor.startup = $;
  QUnit.testDone(function() {
    // Clean up all HTML for the test.
    $('#test').html('');
  });
  QUnit.start();
});
