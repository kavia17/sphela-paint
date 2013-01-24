/**
 * @fileOverview A control class provides the logic for the UI control.
 */
Meteor.startup(function() {
  if (Meteor.isClient) {
    (function() {
      var ControlP, STATE_LOOKUP, NAME_LOOKUP;

      /**
       * @type {string}
       * @const
       */
      STATE_LOOKUP = 'data-state';

      /**
       * @type {string}
       * @const
       */
      NAME_LOOKUP = 'data-name';

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

      /**
       * @param {Element} element
       * @return {string?}
       */
      Control.getControlNameFromElement = function(element) {
        return $(element).attr(NAME_LOOKUP);
      };

      /**
       * @param {string} name
       * @param {Element} element
       */
      Control.setControlNameOnElement = function(name, element) {
        $(element).attr(NAME_LOOKUP, name);
      };

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
        $el = $('[' + NAME_LOOKUP + '="' + this.name_ + '"]');
        $el.attr(STATE_LOOKUP, state);
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

