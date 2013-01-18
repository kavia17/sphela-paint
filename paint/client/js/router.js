/* global history:false */
/**
 * @fileOverview The router is the history push state manager.
 */
Meteor.startup(function() {
  var Router;
  /**
   * @constructor
   */
  Router = function() {
    this.routes_ = [];
  }
  /**
   * Just a wrapper for history.state so as to avoid history references all over
   * the place.
   */
  Router.currentState = function() {
    return history.context;
  }
  /**
   * The default route.
   * @type {sp.Route}
   */
  Router.prototype.defaultRoute_ = null;
  /**
   * @type {Object.<string,sp.Route>}
   * @private
   */
  Router.prototype.routes_ = null;
  /**
   * @param {sp.Route} route
   */
  Router.prototype.setDefaultRoute = function(route) {
    this.defaultRoute_ = route;
  }
  /**
   * @param {Function} routeManager A function that takes a Router and Routers
   * instances as arguments.
   * @param {string} routePath
   * @param {Regexp=} opt_pathParser A regular expression used to parse paths.
   * state's path arguments from the history state.
   */
  Router.prototype.initModule = function(routeManager, path, opt_pathParser) {
    //routeManager gets a reference to the router for pushState loveliness.
    this.routes_[path] = routeManager(new sp.Route(path, opt_pathParser), this);
  }
  /**
   * Iterates through routes until it gets to a path that matches
   * the substring given.
   * @param {string}  pathSubStr
   * @return {Route} The route.
   */
  Router.prototype.getRoute = function(pathSubStr) {
    _.each(this.routes_, function(route, path) {
      if (_.indexOf(path, pathSubStr) === 0) {
        return route;
      }
    });
    return null;
  };
  /**
   * Run a router path manually.
   * @param {Object} state
   */
  Router.prototype.runRoute = function(state) {
    var path, route;
    if (_.isUndefined(state)) {
      route = this.defaultRoute_;
      path = '';
      state = {};
    } else {
      path = state.path;
      if (!path) {
        return;
      }
      route = this.getRoute(path);
    }
    if (!route) {
      return;
    }
    console.log('the fuck', path);
    route.run(state, path);
  };
  sp.router = Router;
});
