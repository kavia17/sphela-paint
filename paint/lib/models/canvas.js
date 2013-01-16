Meteor.startup(function() {
  /**
   * @fileOverview A canvas is the main point of activity and interaction with
   * the app. Every canvas has one painting area and can be shared. It can be
   * public or private where by private I mean it's simply a hidden link.
   */
  sp.Canvases = new Meteor.Collection('canvases');
});
