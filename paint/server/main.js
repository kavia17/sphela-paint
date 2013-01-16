/**
 * @fileOverview Main entry point for the server side.
 */
Meteor.startup(function() {
  /**
   * @param {Array.<Function>} modules
   */
  function main(modules) {
    console.log('Started server app.');
  }
  sp.main = main;
});
