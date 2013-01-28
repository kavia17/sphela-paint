/**
 * @fileOverview The canvas browser is the way to find public canvases.
 */
define([
], function() {
  var ROUTER_PATH, browser;
  /**
   * @type {string}
   * @const
   */
  ROUTER_PATH = '/browser';
  /**
   * @type {Object}
   */
  browser = {};
  /**
   * This module needs router access.
   */
  browser.routed = true;
  if (Meteor.isClient) {
    (function() {
      /**
       * @param {Object} state
       * @param {string} page
       */
      function stateHandler(state, page) {
        console.log('browser', page);
      }
      /**
       * @param {Route} route
       */
      function routeManager(route) {
        route.setHandler(_.bind(stateHandler, this));
        return route;
      }
      function clientInit() {
      }
      browser.clientInit = clientInit;
      function routerInit() {
        return [routeManager, ROUTER_PATH];
      }
      browser.routerInit = routerInit;
    }());
  }
  if (Meteor.isServer) {
    (function() {
      function serverInit() {
      }
      browser.serverInit = serverInit;
    }());
  }
  return browser;
});
