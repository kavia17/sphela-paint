/**
 * @fileOverview The canvas container is the main drawing area.
 */
define([
  ], function() {
  var ROUTER_PATH, container;
  /**
   * @type {string}
   * @const
   */
  ROUTER_PATH = '/canvas';
  /**
   * @type {Object}
   */
  container = {};
  /**
   * This module needs router access.
   */
  container.routed = true;
  if (Meteor.isClient) {
    (function() {
      /**
       * @param {Object} state
       * @param {string} canvasName
       */
      function stateHandler(state, canvasName) {
        console.log('canvas', canvasName);
      }
      container.stateHandler = _.bind(stateHandler, this);
      /**
       * @param {Route} route
       */
      function routeManager(route) {
        route.setHandler(container.stateHandler);
        return route;
      }
      container.routeManager = routeManager;
      function clientInit() {
      }
      container.clientInit = clientInit;
      function routerInit() {
        return [routeManager, ROUTER_PATH];
      }
      container.routerInit = routerInit;
    }());
  }
  if (Meteor.isServer) {
    (function() {
      function serverInit() {
      }
      container.serverInit = serverInit;
    }());
  }
  return container;
});
