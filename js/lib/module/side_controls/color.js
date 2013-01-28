/**
 * @fileOverview A color control.
 */
define([
    './control'
  ], function(Control) {
  var ColorP;
  /**
   * @param {name}
   * @constructor
   * @extends sp.controls.Control;
   */
  function Color(name) {
    this.parent(this, name, [
      Color.state.ON,
      Color.state.OFF
    ], Color.ON);
  }
  sp.base.inherits(Color, sp.controls.Control);
  /**
   * @const
   * @enum {string}
   */
  Color.state = {
    ON: 'on',
    OFF: 'off'
  };
  if (Meteor.isClient) {
    return Color;
  }
});



