/**
 * @fileOverview A stub/mock for meteor.js Session.
 */
define([
], function() {
  var store;
  store = {};
  return {
    /**
     * @param {string} key
     * @return {*}
     */
    get: function(key) {
      return store[key];
    },
    /**
     * @param {string} key
     * @param {*} data
     */
    set: function(key, data) {
      store[key] = data;
    }
  };
});

