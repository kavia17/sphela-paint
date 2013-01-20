/**
 * @fileOverview Side controls are used to manipulate the canvas in the canvas
 * container.
 */
Meteor.startup(function() {
  /**
   * @type {Object}
   */
  sp.controls = {};
  if (Meteor.isClient) {
    (function() {
      function clientInit() {
        return null;
      }
      sp.controls.init = clientInit;
    }());
  }
  if (Meteor.isServer) {
    (function() {
      function serverInit() {
      }
      sp.controls.init = serverInit;
    }());
  }
});

