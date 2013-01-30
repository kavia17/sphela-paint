/**
 * @fileOverview A shape control.
 */
define([
  'underscore',
  '../../base',
  './control'
], function(_, base, Control) {
  var ShapeP;
  /**
   * @param {Object} Session
   * @constructor
   * @extends {Control}
   */
  function Shape(Session) {
    Shape.parent(this, [Shape.NAME, _.bind(this.handleClick_, this),
      Shape.selectionOrder, Shape.state.CIRCLE]);
    /**
     * @private
     * @type {Object}
     */
    this.session_ = Session;
  }
  base.inherits(Shape, Control);
  /**
   * @type {string}
   * @const
   */
  Shape.NAME = 'shape';
  /**
   * @enum {string}
   * @const
   */
  Shape.state = {
    CIRCLE: 'circle',
    SQUARE: 'square'
  };
  /**
   * @type {Array.<string>}
   */
  Shape.selectionOrder = _.keys(Shape.state);
  /**
   * @type {string}
   * @const
   */
  Shape.SESSION_KEY = 'selected_shape';
  ShapeP = Shape.prototype;
  /**
   * @private
   */
  ShapeP.handleClick_ = function() {
    var nextState, index;
    index = _.indexOf(Shape.selectionOrder, this.state());
    if (index < Shape.selectionOrder - 1) {
      nextState = Shape.selectionOrder[index + 1];
    } else {
      nextState = Shape.selectionOrder[0];
    }
    this.setState(nextState);
    this.session_.set(Shape.SESSION_KEY, nextState);
  };
  return Shape;
});


