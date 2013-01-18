/**
 * @fileOverview Main entry point for the client side.
 */
Meteor.startup(function() {
  /**
   * @param {Array.<Function>} modules
   * @param {Function} Router
   */
  function main(modules, Router) {
    var r;
    r = new Router();
    _.each(modules, function(module) {
      module.init();
      if (module.routed) {
        // Some things do not need router access.
        r.initModule.apply(r, module.routerInit());
      }
    });
    r.runRoute(Router.currentState());
  }
  sp.main = main;
});
