/**
 * @fileOverview The canvas browser is the way to find public canvases.
 */
Meteor.startup(function() {
  var ROUTER_PATH;
  /**
   * @type {string}
   * @const
   */
  ROUTER_PATH = '/browser';
  /**
   * @type {Object}
   */
  sp.browser = {};
  /**
   * This module needs router access.
   */
  sp.browser.routed = true;
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
       * @param {sp.Route} route
       */
      function routeManager(route) {
        route.setHandler(_.bind(stateHandler, this));
        return route;
      }
      function clientInit() {
      }
      sp.browser.init = clientInit;
      function routerInit() {
        return [routeManager, ROUTER_PATH];
      }
      sp.browser.routerInit = routerInit;
    }());
  }
  if (Meteor.isServer) {
    (function() {
      function serverInit() {
      }
      sp.browser.init = serverInit;
    }());
  }
});
