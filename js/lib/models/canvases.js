/**
 * @fileOverview The data store for a Canvas.
 */
define([
  '../../meteor'
], function(Meteor) {
  return new Meteor.Collection('canvases');
});
