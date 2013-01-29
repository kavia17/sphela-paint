/**
 * @fileOverview The main entry point for client and server. As files are
 * loaded depth-first this is the last file to load. All files must begin with
 * meteor.startup to be able to see the sp namespace.
 */
/**
 * A safe reference to the global object.
 * @type {Object};
 */
require([
  './meteor',
  './lib/module/canvas_container/canvas_container',
  './lib/module/canvas_browser/canvas_browser',
  './lib/module/messages/messages',
  './lib/module/side_controls/side_controls',
  './lib/client/main',
  './lib/server/main',
  './lib/client/router',
], function(Meteor, container, browser, messages, controls, client, server,
    Router) {
  /**
   * Entry point for app.
   */
  Meteor.startup(function () {
    modules = [
      container,
      browser,
      messages,
      controls
    ];
    if (Meteor.isClient) {
      client.main(modules, Router);
    } else {
      server.main(modules);
    }
  });
});
