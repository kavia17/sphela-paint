/**
 * @fileOverview A library with shared resources.
 */
var __global = this;
define(function() {
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
     * @param {string|Object} methodOrConstructor
     * @param {Object} context,
     * @return {*}
     */
    parent: function(methodOrConstructor, opt_args) {
      var method;
      if(methodOrConstructor === this) {
        return this.constructor.parent_.apply(this, opt_args || []);
      }
      method = methodOrConstructor;
      return this.constructor.parent_.prototype[method].apply(
        this, opt_args || []);
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
      Base.prototype.parent = function() {
        return base.parent.apply(this, arguments);
      };
    }
  };
  return base;
});

