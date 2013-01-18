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
    function clientInit() {
      return null;
    }
    sp.messages.init = clientInit;
  }
  if (Meteor.isServer) {
    function serverInit() {
    }
    sp.messages.init = serverInit;
  }
});
