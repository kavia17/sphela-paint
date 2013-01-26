/**
 * @fileOverview Template event listeners for side controls.
 */
if (Meteor.isClient) {
  (function() {
    /**
     * @param {Event} event
     */
    function handleControlClick(event) {
      var name;
      name = sp.controls.Control.getControlNameFromElement(event.target);
      sp.controls.registry.action(name);
    }

    Template.sideControls.events({
      'click .control': handleControlClick
    });
  }());
}
