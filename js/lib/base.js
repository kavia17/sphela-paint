/**
 * @fileOverview A library with shared resources.
 */
var __global = this;
define([
  'underscore'
  ], function(_) {
  var base;
  base = {
    /**
     * A reference to the global scope.
     * @type {Object}
     */
    global: __global,
    /**
     * A no operation function.
     * @type {Function}
     */
    noop: function() {},
    /**
     * A way to call an inherited method, including the
     * constructor.
     * Call parent with 'this' as the argument to call a constructor.
     * Call parent with a method name as string to call the parent's method.
     * @param {Function} constructor
     * @param {Object} thisArg
     * @param {string|Array=} opt_methodOrArgs
     * @param {Array=} opt_args
     * @return {*}
     */
    parent: function(Base, thisArg, opt_methodOrArgs, opt_args) {
      var method, args, parent;
      if (_.isString(opt_methodOrArgs)) {
        method = opt_methodOrArgs;
        args = opt_args || [];
      } else {
        args = opt_methodOrArgs || [];
      }
      if(_.isUndefined(method)) {
        return Base.parent_.apply(thisArg, args);
      }
      parent = Base.parent_;
      do {
        if (_.isFunction(parent.prototype[method])) {
          break;
        }
      } while (parent = parent.parent_);
      if (_.isUndefined(parent)) {
        throw 'Method ' + method + ' not defined on any parent.';
      }
      return parent.prototype[method].apply(
        thisArg, args);
    },
    /**
     * A way to inherit from another class.
     * Inspired by the Google Closure Library.
     * @return {Object}
     */
    inherits: function(Base, Super) {
      /**
       * @constructor
       */
      function Temp() {}
      Temp.prototype = Super.prototype;
      Base.parent_ = Super;
      Base.prototype = new Temp();
      Base.prototype.constructor = Base;
      Base.parent = _.bind(base.parent, this, Base);
    }
  };
  return base;
});

