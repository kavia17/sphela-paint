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
    function clientInit() {
      return null;
    }
    sp.controls.init = clientInit;
  }
  if (Meteor.isServer) {
    function serverInit() {
    }
    sp.controls.init = serverInit;
  }
});

