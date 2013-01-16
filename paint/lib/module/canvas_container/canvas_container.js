/**
 * @fileOverview The canvas container is the main drawing area.
 */
Meteor.startup(function() {
  /**
   * @type {Object}
   */
  sp.container = {};
  if (Meteor.isClient) {
    function clientInit() {
      return [];
    }
    sp.container.init = clientInit;
  }
  if (Meteor.isServer) {
    function serverInit() {
    }
    sp.container.init = serverInit;
  }
});
