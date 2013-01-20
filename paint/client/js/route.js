/**
 * @fileOverview A Route is a wrapper for managing push state. It's an interface
 * of sorts.
 */
Meteor.startup(function() {
  var Route;
  /**
   * @param {RegExp=} opt_pathParser
   * @constructor
   */
  Route = function(opt_pathParser) {
    this.parser_ = opt_pathParser || null;
  };
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
   * @param {string} path
   * @param {Object} state
   */
  Route.prototype.run = function(path, state) {
    var result;
    if (_.isNull(this.path_)) {
      return;
    }
    if (!_.isFunction(this.stateHandler_)) {
      return;
    }
    if (this.parser_) {
      result = this.parser_.exec(path);
      if (result) {
        this.stateHandler_.apply(null, [state].concat(result.splice(1)));
        return;
      }
    }
    this.stateHandler_(state);
  };
  sp.Route = Route;
});
