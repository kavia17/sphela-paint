/**
 * @fileOverview A color control.
 */
Meteor.startup(function() {
  if (Meteor.isClient) {
    (function() {
      var ColorP;
      /**
       * @param {name}
       * @constructor
       * @extends sp.controls.Control;
       */
      function Color(name) {
      }
      sp.base.inherits(Color, sp.controls.Control);
      sp.controls.Color = Color;
    }());
  }
});



