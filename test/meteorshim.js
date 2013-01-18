/**
 * @fileOverview A shim to help test Meteor.
 */
var Meteor, sp;
Meteor = {
  // $() is a shortcut for $(document).ready in jQuery.
  startup: $,
  isClient: true,
  isServer: false
};
sp = {};
