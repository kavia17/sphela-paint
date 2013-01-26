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
      sp.controls.Color = Color;
    }());
  }
});



