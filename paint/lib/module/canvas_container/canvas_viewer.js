Meteor.startup(function() {
  if (Meteor.isClient) {
    (function() {
      var Viewer, ViewerP;
      /**
       * @constructor
       */
      Viewer = function() {
        /**
         * @type {number}
         */
        this.xPos = 0;
        /**
         * @type {number}
         */
        this.yPos = 0;
        /**
         * @type {number}
         */
        this.wResolution = Viewer.DEFAULT_RESOLUTION;
        /**
         * @type {number}
         */
        this.hResolution = Viewer.DEFAULT_RESOLUTION;
      };
      /**
       * @type {number}
       * @const
       */
      Viewer.MAX_RESOLUTION = 100;
      /**
       * @type {number}
       * @const
       */
      Viewer.MIN_RESOLUTION = 5;
      /**
       * @type {number}
       * @const
       */
      Viewer.DEFAULT_RESOLUTION = Viewer.MIN_RESOLUTION;
      ViewerP = Viewer.prototype;
      sp.container.Viewer = Viewer;
    }());
  }
});
