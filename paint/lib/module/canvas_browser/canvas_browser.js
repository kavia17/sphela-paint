/**
 * @fileOverview The canvas browser is the way to find public canvases.
 */
Meteor.startup(function() {
  /**
   * @type {Object}
   */
  sp.browser = {};
  if (Meteor.isClient) {
    function clientInit() {
      return [];
    }
    sp.browser.init = clientInit;
  }
  if (Meteor.isServer) {
    function serverInit() {
    }
    sp.browser.init = serverInit;
  }
});
