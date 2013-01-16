/* global history:false */
Meteor.startup(function() {
  var Router;
  /**
   * @constructor
   */
  Router = function() {
  }
  /**
   * Just a wrapper for history.state so as to avoid history references all over
   * the place.
   */
  Router.currentState = function() {
    return history.context;
  }
  /**
   * @type {Object.<string,sp.Route>}
   */
  Router.prototype.routes = null;
  /**
   * @param {Function} stateHandler
   * @param {string} routePath
   * @param {Function} routeManager
   * state's path arguments from the history state.
   */
  Router.prototype.initModule = function(stateHandler, path, routeManager) {
    //routeManager gets a reference to the router for pushState loveliness.
    routeManager(this);
    this.routes[path] = stateHandler(new Router(path));
  }
  /**
   * Run a router path manually.
   * @param {Object} state
   */
  Router.prototype.runRoute = function(state) {
    var path;
    path = state.path;
    if (!path) {
      return;
    }
    if (_.has(this.routes, path)) {
      this.routes[path].run(state);
    }
  };
  sp.router = Router;
});
