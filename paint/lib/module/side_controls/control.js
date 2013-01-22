/**
 * @fileOverview A control class provides the logic for the UI control.
 */
Meteor.startup(function() {
  if (Meteor.isClient) {
    (function() {
      var ControlP, STATE_PREFIX;

      /**
       * @type {string}
       * @const
       */
      STATE_PREFIX = 'state-';

      /**
       * @param {Function} name
       * @param {Function} action
       * @param {Array} states
       * @param {string} defaultState
       * @constructor
       */
      function Control(name, action, states, defaultState) {
        /**
         * @type {string}
         */
        this.name_ = name;
        /**
         * @type {Function}
         * @private
         */
        this.action_ = action;
        /**
         * @type {Array.<string>}
         * @private
         */
        this.states_ = states;
        /**
         * @type {string}
         * @private
         */
        this.state_ = defaultState;
        this.updateButtonState_(defaultState);
      }
      ControlP = Control.prototype;

      /**
       * Calls the assigned action.
       */
      ControlP.click = function() {
        this.action_();
      };

      /**
       * @param {string} state
       */
      ControlP.setState = function(state) {
        if (this.states_.indexOf(state) !== -1) {
          this.updateButtonState_(state);
          this.state_ = state;
        }
      };

      /**
       * @param {string} state
       * @private
       */
      ControlP.updateButtonState_ = function(state) {
        var $el;
        $el = $('.' + this.name_);
        if (this.state_) {
          $el.removeClass(STATE_PREFIX + this.state_);
        }
        $el.addClass(STATE_PREFIX + state);
      };

      /**
       * @return {string}
       */
      ControlP.state = function() {
        return this.state_;
      };

      /**
       * @return {string}
       */
      ControlP.name = function() {
        return this.name_;
      };

      sp.controls.Control = Control;
    }());
  }
});

