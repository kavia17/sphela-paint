/**
 * @fileOverview Messages are a way to communicate with other players.
 */
Meteor.startup(function() {
  var ROUTER_PATH;
  /**
   * @type {Object}
   */
  sp.messages = {};
  if (Meteor.isClient) {
    (function() {
      function clientInit() {
        return null;
      }
      sp.messages.clientInit = clientInit;
    }());
  }
  if (Meteor.isServer) {
    (function() {
      function serverInit() {
      }
      sp.messages.serverInit = serverInit;
    }());
  }
});
