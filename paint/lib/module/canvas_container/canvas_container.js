/**
 * @fileOverview The canvas container is the main drawing area.
 */
Meteor.startup(function() {
  var ROUTER_PATH;
  /**
   * @type {string}
   * @const
   */
  ROUTER_PATH = '/canvas';
  /**
   * @type {Object}
   */
  sp.container = {};
  /**
   * This module needs router access.
   */
  sp.container.routed = true;
  if (Meteor.isClient) {
    (function() {
      /**
       * @param {Object} state
       * @param {string} canvasName
       */
      function stateHandler(state, canvasName) {
        console.log('canvas', canvasName);
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
      sp.container.init = clientInit;
      function routerInit() {
        return [routeManager, ROUTER_PATH];
      }
      sp.container.routerInit = routerInit;
    }());
  }
  if (Meteor.isServer) {
    (function() {
      function serverInit() {
      }
      sp.container.init = serverInit;
    }());
  }
});
