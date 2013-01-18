/**
 * @fileOverview A Route is a wrapper for managing push state. It's an interface
 * of sorts.
 */
Meteor.startup(function() {
  var Route;
  /**
   * @param {string} path
   * @param {RegExp=} opt_pathParser
   * @constructor
   */
  Route = function(path, opt_pathParser) {
    this.path_ = path;
    this.parser_ = opt_pathParser || null;
  };
  /**
   * @type {string?}
   * @private
   */
  Route.prototype.path_ = null;
  /**
   * @type {RegExp}
   * @private
   */
  Route.prototype.parser_ = null;
  /**
   * @type {Function}
   * @private
   */
  Route.prototype.stateHandler_ = null;
  /**
   * @param {Function} stateHandler
   */
  Route.prototype.setHandler = function(stateHandler) {
    this.stateHandler_ = stateHandler;
  };
  /**
   * @param {Object} state
   * @param {string} path
   */
  Route.prototype.run = function(state, path) {
    if (_.isNull(this.path_)) {
      return;
    }
    if (!_.isFunction(this.stateHandler_)) {
      return;
    }
    if (this.parser_) {
//      this.stateHandler_.apply(null, [state].concat(this.parser_.exec(path)));
    } else {
//      this.stateHandler_(state);
    }
  };
  sp.Route = Route;
});
