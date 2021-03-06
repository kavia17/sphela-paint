/**
 * @fileOverview Side controls are used to manipulate the canvas in the canvas
 * container.
 */
define([
  './registry',
  './color',
  './shape'
], function(registry, shape) {
  var controls;
  controls = {};
  /**
   * @type {Object}
   */
  if (Meteor.isClient) {
    (function() {
      function clientInit() {
        return null;
      }
      controls.clientInit = clientInit;
    }());
  }
  if (Meteor.isServer) {
    (function() {
      function serverInit() {
      }
      controls.serverInit = serverInit;
    }());
  }
  return controls;
});

