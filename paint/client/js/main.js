/**
 * @fileOverview Main entry point for the client side.
 */
Meteor.startup(function() {
  /**
   * @param {Array.<Function>} modules
   * @param {Function} Router
   */
  function startClient(modules, Router) {
    var r;
    r = new Router();
    _.each(modules, function(init) {
      r.initModule.apply(r, init());
    });
    r.runRoute(Router.currentState());
  }
  sp.main = main;
});
