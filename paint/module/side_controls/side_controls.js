/**
 * @fileOverview Side controls are used to manipulate the canvas in the canvas
 * container.
 */
Meteor.startup(function() {
  /**
   * @type {Object}
   */
  if (Meteor.isClient) {
    (function() {
      function clientInit() {
        return null;
      }
      sp.controls.clientInit = clientInit;
    }());
  }
  if (Meteor.isServer) {
    (function() {
      function serverInit() {
      }
      sp.controls.serverInit = serverInit;
    }());
  }
});
