/**
 * @fileOverview A simple on or off control.
 */
define([
    '../../base',
    './control'
  ], function(base, Control) {
  var ToggleP;
  /**
   * @param {name}
   * @param {Toggle.state=} opt_defaultState
   * @constructor
   * @extends Control;
   */
  function Toggle(name, opt_defaultState) {
    Toggle.parent(this, [name, _.bind(this.handleToggle_, this), [
      Toggle.state.ON,
      Toggle.state.OFF ], opt_defaultState || Toggle.state.OFF]);
  }
  base.inherits(Toggle, Control);
  /**
   * @const
   * @enum {string}
   */
  Toggle.state = {
    ON: 'on',
    OFF: 'off'
  };
  ToggleP = Toggle.prototype;
  /**
   * @protected
   */
  ToggleP.handleToggle_ = function() {
    if (this.state() === Toggle.state.ON) {
      this.setState(Toggle.state.OFF);
    } else {
      this.setState(Toggle.state.ON);
    }
  };
  return Toggle;
});
