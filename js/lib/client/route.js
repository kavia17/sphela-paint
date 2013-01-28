/**
 * @fileOverview A Route is a wrapper for managing push state. It's an interface
 * of sorts.
 */
define([
 ],function() {
  var Route;
  /**
   * @param {string} path
   * @param {RegExp=} opt_pathParser
   * @constructor
   */
  Route = function(path, opt_pathParser) {
    /**
     * @type {string}
     * @private
     */
    this.path_ = path;
    /**
     * @type {RegExp}
     * @private
     */
    this.parser_ = opt_pathParser || null;
  };
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
  /**
   * @return {string}
   */
  Route.prototype.path = function() {
    return this.path_;
  };
  /**
   * @return {string}
   */
  Route.prototype.parser = function() {
    return this.parser_;
  };
  return Route;
});
