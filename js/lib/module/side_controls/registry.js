/**
 * @fileOverview A registry of controls.
 */
define([
    './control'
  ], function(Control) {
  if (Meteor.isClient) {
    var registry, controls;
    /**
     * @type {Object.<string, Control>}
     */
    controls = {};
    /**
     * @type {Object}
     */
    registry = {
      /**
       * @param {name}
       * @param {Array} states
       * @param {string} defaultState
       * @param {Element}
       * @param {Function} action
       * @return {Control}
       */
      addControl: function(name, states, defaultState, element, action) {
        if (_.has(controls, name)) {
          throw 'Registry already has that control: ' + name;
        }
        Control.setControlNameOnElement(name, element);
        return controls[name] = new Control(name, action,
          states, defaultState);
      },
      /**
       * @param {string}
       * @return {Control}
       */
      control: function(name) {
        return controls[name] || null;
      },
      /**
       * @param {string} name
       */
      click: function(name) {
        if (_.has(controls, name)) {
          controls[name].click();
        }
      },
      /**
       * Return the state of a named control.
       * @param {string} name
       * @return {string?}
       */
      state: function(name) {
        if(_.has(controls, name)) {
          return controls[name].state();
        }
        return null;
      },
      /**
       * Set the state of a control by name.
       * @param {string} name
       * @param {string} state
       */
      setState: function(name, state) {
        if(_.has(controls, name)) {
          return controls[name].setState(state);
        }
      },
      clear: function() {
        controls = {};
      }
    };
    return registry;
  }
});

