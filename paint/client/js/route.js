Meteor.startup(function() {
  var Route;
  /**
   * @param
   * @constructor
   */
  Route = function() {
  };
  /**
   * @type {string}
   * @private
   */
  Route.prototype.path_ = '';
  /**
   * @param {Object} state
   */
  Route.prototype.run = function(state) {
    //Do something.
  };
  sp.route = Route;
});
