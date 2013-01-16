/**
 * @fileOverview The main entry point for client and server. As files are
 * loaded depth-first this is the last file to load. All files must begin with
 * meteor.startup to be able to see the sp namespace.
 */
/**
 * The main app namespace.
 * @type {Object};
 */
var sp = {};
/**
 * A safe reference to the global object.
 * @type {Object};
 */
sp.global = this;
/**
 * sp.main does different things on client and server.
 * Check client/main.js and client/server.js
 */
Meteor.startup(function () {
  sp.modules = [
    sp.container.init,
    sp.browser.init,
    sp.messages.init,
    sp.controls.init
  ];
  //sp.router is undefined on server and ignored.
  sp.main(sp.modules, sp.router);
});
