/**
 * @fileOverview A color control.
 */
define([
    '../../base',
    './toggle'
  ], function(base, Toggle) {
  var ColorP, colors;
  /**
   * A container of all color instances.
   * @type {Array.<Color>}
   */
  colors = [];
  /**
   * @param {name}
   * @param {Object} Session
   * @constructor
   * @extends Toggle;
   */
  function Color(name, Session) {
    Color.parent(this, [name]);
    /**
     * A reference to the Meteor.js Session.
     * @private {Object}
     */
    this.session_ = Session;
    colors.push(this);
  }
  /**
   * @type {string}
   * @const
   */
  Color.SESSION_KEY = 'selected_color';
  base.inherits(Color, Toggle);
  ColorP = Color.prototype;
  ColorP.handleToggle_ = function() {
    Color.parent(this, 'handleToggle_');
    if (this.state() === Toggle.state.ON) {
      _.each(colors, function(color) {
        if (color !== this) {
          color.setState(Toggle.state.OFF);
        }
      }, this);
      this.session_.set(Color.SESSION_KEY, this.name());
    }
  };
  return Color;
});
