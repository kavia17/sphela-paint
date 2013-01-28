/**
 * @fileOverview Messages are a way to communicate with other players.
 */
define([
], function() {
  var ROUTER_PATH, messages;
  /**
   * @type {Object}
   */
  messages = {};
  if (Meteor.isClient) {
    (function() {
      function clientInit() {
        return null;
      }
      messages.clientInit = clientInit;
    }());
  }
  if (Meteor.isServer) {
    (function() {
      function serverInit() {
      }
      messages.serverInit = serverInit;
    }());
  }
  return messages;
});
