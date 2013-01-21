/**
 * @fileOverview This file is used to help stub and mock up required items for
 * tests.
 */
(function() {
  function CollectionInstance() {}
  CollectionInstance.prototype = {
    find: function() {},
    findOne: function() {}
  };
  function Collection() {
    return CollectionInstance;
  }
  function Context (spy) {
    this.invalidateSpy = spy;
  }
  Context.prototype.onInvalidate = function() {};
  Context.prototype.invalidate = function() {
    this.invalidateSpy();
  };
  Context.prototype.id = 'foo';
  function createMockContext() {
    Meteor.deps.Context.current = new Context(sinon.spy());
  }
  function clearMockContext() {
    Meteor.deps.Context.current = null;
  }
  Meteor = {
    Collection: Collection,
    // $() is a shortcut for $(document).ready in jQuery.
    startup: $,
    deps: {Context: { current: null}},
    createMockContext: createMockContext,
    clearMockContext: clearMockContext,
    isClient: true,
    isServer: true
  };
  sp = {};
}());

