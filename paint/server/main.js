/**
 * @fileOverview Main entry point for the server side.
 */
(function() {
  function main() {
    console.log('Started server app.');
  }
  Meteor.startup(function () {
    main();
  });
}());
