/**
 * @fileOverview The main entry point for client and server. As files are
 * loaded depth-first this is the last file to load. All files must begin with
 * meteor.startup to be able to see the sp namespace.
 */
/**
 * A safe reference to the global object.
 * @type {Object};
 */
sp.global = this;
/**
 * Entry point for app.
 */
Meteor.startup(function () {
  sp.modules = [
    sp.container,
    sp.browser,
    sp.messages,
    sp.controls
  ];
  if (Meteor.isClient) {
    sp.clientMain(sp.modules, sp.Router);
  } else {
    sp.serverMain(sp.modules);
  }
});
