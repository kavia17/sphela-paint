/**
 * @fileOverview A canvas is the main point of activity and interaction with
 * the app. Every canvas has one painting area and can be shared. It can be
 * public or private where by private I mean it's simply a hidden link.
 */
define([
    '../../meteor'
  ], function(Meteor) {
  var CanvasP;

  /**
   * The object representation of a canvas.
   * @param {Object=} opt_canvasData
   * @constructor
   */
  function Canvas(opt_canvasData) {
    /**
     * @type {Object}
     * @private
     */
    this.data_ = opt_canvasData || this.genEmptyData_();
    /**
     * Reactive Meteor listeners.
     * @type {Object}
     * @private
     */
    this.listeners_ = {};
  }

  /**
   * The canvas is a 19:6 ratio.
   * @type {number}
   * @const
   */
  Canvas.CANVAS_WIDTH = 380;

  /**
   * @type {number}
   * @const
   */
  Canvas.CANVAS_HEIGHT = 120;

  /**
   * @enum {number}
   * @const
   */
  Canvas.markType = {
    NONE: 0,
    CIRCLE: 1,
    SQUARE: 2
  };

  /**
   * @enum {number}
   * @const
   */
  Canvas.markSize = {
    SMALL: 0,
    MID: 1,
    LARGE: 2
  };

  /**
   * @enum {number}
   */
  Canvas.markColor = {
    RED: 0,
    GREEN: 1,
    BLUE: 2
  };

  /**
   * Check to make sure the options being set are valid.
   * @param {number} type
   * @param {number} size
   * @param {number} color
   * @return {boolean}
   */
  Canvas.validOptions = function(type, size, color) {
    var vals;
    vals = _.values(Canvas.markType);
    if (vals.indexOf(type) < 0) {
      return false;
    }
    vals = _.values(Canvas.markSize);
    if (vals.indexOf(size) < 0) {
      return false;
    }
    vals = _.values(Canvas.markColor);
    if (vals.indexOf(color) < 0) {
      return false;
    }
    return true;
  };

  CanvasP = Canvas.prototype;

  /**
   * @param {Object} canvasData
   */
  CanvasP.updateData = function(canvasData) {
    this.data_ = canvasData;
    this.invalidateListeners_();
  };

  /**
   * @private
   * @return {Object}
   */
  CanvasP.genEmptyData_ = function() {
    return {
      name: null, // TODO: remember to validate for URL friendliness.
      password: null,
      votes: 0,
      graph: this.genEmptyGraph_(),
      when: new Date().getTime()
    };
  };

  /**
   * @private
   * @return {Array}
   */
  CanvasP.genEmptyGraph_ = function () {
    var i, j, rows, row;
    rows = [];
    for(i = 0; i < Canvas.CANVAS_HEIGHT; i++) {
      row = [];
      for(j = 0; j < Canvas.CANVAS_WIDTH; j++) {
        row.push({
          t: Canvas.markType.NONE,
          s: Canvas.markSize.SMALL,
          c: Canvas.markColor.RED
        });
      }
      rows.push(row);
    }
    return rows;
  };

  /**
   * Returns the low level information required to draw canvas.
   * @return {Array}
   */
  CanvasP.canvasData = function() {
    this.setReactive_();
    return this.data_.graph;
  };

  /**
   * @return {Object}
   */
  CanvasP.rawData = function() {
    return this.data_;
  };

  /**
   * @return {string}
   */
  CanvasP.name = function() {
    return this.data_.name;
  };

  /**
   * @return {string}
   */
  CanvasP.password = function() {
    return this.data_.password;
  };

  /**
   * @return {string}
   */
  CanvasP.votes = function() {
    return this.data_.votes;
  };

  /**
   * @return {Date}
   */
  CanvasP.when = function() {
    return new Date(this.data_.when);
  };

  /**
   * Update a particular grid instance in the canvas data.
   * @param {number} x
   * @param {number} y
   * @param {number} type
   * @param {number} size
   * @param {number} color
   */
  CanvasP.setDataAt = function(x, y, type, size, color) {
    var data, options;
    data = this.getDataAt_(x, y);
    if (!data) {
      return;
    }
    if (!Canvas.validOptions(type, size, color)) {
      return;
    }
    data.t = type;
    data.s = size;
    data.c = color;
    this.invalidateListeners_();
  };

  /**
   * @param {number} x
   * @param {number} y
   * @private
   * @return {Object}
   */
  CanvasP.getDataAt_ = function(x, y) {
    var graph;
    graph = this.data_.graph;
    if (!_.has(graph, y)) {
      return null;
    }
    if (!_.has(graph[y], x)) {
      return null;
    }
    return graph[y][x];
  };

  /**
   * Returns a copy for saftey.
   * @param {number} x
   * @param {number} y
   * @private
   */
  CanvasP.getDataAt = function(x, y) {
    var data;
    data = this.getDataAt_(x, y);
    if (!data) {
      return data;
    }
    this.setReactive_();
    return _.clone(this.getDataAt_(x, y));
  };

  /**
   * Sets a method as reactive for an instance of this class.
   * @private
   */
  CanvasP.setReactive_ = function() {
    var ctx;
    ctx = Meteor.deps.Context.current;
    if (ctx && !_.has(this.listeners_, ctx.id)) {
      this.listeners_[ctx.id] = ctx;
      ctx.onInvalidate(_.bind(function() {
        delete this.listeners_[ctx.id];
      }, this));
    }
  };

  /**
   * Invalidate all the reactive listeners.
   * @private
   */
  CanvasP.invalidateListeners_ = function() {
    _.each(this.listeners_, function(listener) {
      listener.invalidate();
    });
  };

  return Canvas;
});
