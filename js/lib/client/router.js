/* global history:false */
/**
 * @fileOverview The router is the history push state manager.
 */
define([
  './route'
], function(Route) {
  /**
   * @constructor
   */
  function Router() {
    this.routes_ = {};
  }
  /**
   * Just a wrapper for history.state so as to avoid history references all over
   * the place.
   */
  Router.currentState = function() {
    return history.context;
  };
  /**
   * The default route.
   * @type {Route}
   */
  Router.prototype.defaultRoute_ = null;
  /**
   * @type {Object.<string,Route>}
   * @private
   */
  Router.prototype.routes_ = null;
  /**
   * @param {Route} route
   */
  Router.prototype.setDefaultRoute = function(route) {
    this.defaultRoute_ = route;
  };
  /**
   * @param {Function} routeManager A function that takes a Router and Routers
   * instances as arguments.
   * @param {string} routePath
   * @param {Regexp=} opt_pathParser A regular expression used to parse paths.
   * state's path arguments from the history state.
   */
  Router.prototype.initModule = function(routeManager, path, opt_pathParser) {
    //routeManager gets a reference to the router for pushState loveliness.
    this.routes_[path] = routeManager(new Route(path, opt_pathParser), this);
  };
  /**
   * Iterates through routes until it gets to a path that matches
   * the full path given.
   * @param {string} fullPath
   * @return {Route} The route.
   */
  Router.prototype.getRoute = function(fullPath) {
    return _.find(this.routes_, function(route, path) {
      if (fullPath.indexOf(path) === 0) {
        return true;
      }
      return false;
    }) || null;
  };
  /**
   * Run a router path manually.
   * @param {string=} opt_path
   * @param {Object=} opt_state
   */
  Router.prototype.runRoute = function(opt_path, opt_state) {
    var path, state, route;
    if (_.isUndefined(opt_state)) {
      state = {};
    } else {
      state = opt_state;
    }
    if (!_.isString(opt_path) || !opt_path.length) {
      route = this.defaultRoute_;
      path = '';
    } else {
      path = opt_path;
      route = this.getRoute(path);
    }
    if (!route) {
      return;
    }
    route.run(path, state);
  };
  return Router;
});
