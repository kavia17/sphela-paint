define([
    '../js/lib/models/canvases',
    '../js/lib/models/canvas'
  ], function(Canvases, Canvas) {
  var canvas;
  QUnit.module('Canvas Model', {
    setup: function() {
      canvas = new Canvas();
    },
    teardown: function() {
    }
  });
  QUnit.test('Canvases should exist.', function() {
    QUnit.ok(Canvases, 'Canvases should exist.');
  });
  QUnit.test('Canvas should exist.', function() {
    QUnit.ok(Canvas, 'Canvas should exist.');
  });
  QUnit.test('Canvas.CANVAS_WIDTH should be a number.', function() {
    QUnit.ok(_.isNumber(Canvas.CANVAS_WIDTH),
      'CANVAS_WIDTH should be a number.');
  });
  QUnit.test('Canvas.CANVAS_HEIGHT should be a number.', function() {
    QUnit.ok(_.isNumber(Canvas.CANVAS_HEIGHT),
      'CANVAS_HEIGHT should be a number.');
  });
  QUnit.test('Canvas.markType should be an enum with numbers.',
    function() {
      QUnit.strictEqual(Canvas.markType.NONE, 0, 'NONE should be 0.');
      QUnit.strictEqual(Canvas.markType.CIRCLE, 1, 'CIRCLE should be 1.');
      QUnit.strictEqual(Canvas.markType.SQUARE, 2, 'NONE should be 2.');
  });
  QUnit.test('Canvas.markSize should be an enum with numbers.',
    function() {
      QUnit.strictEqual(Canvas.markSize.SMALL, 0, 'SMALL should be 0.');
      QUnit.strictEqual(Canvas.markSize.MID, 1, 'MID should be 1.');
      QUnit.strictEqual(Canvas.markSize.LARGE, 2, 'LARGE should be 2.');
  });
  QUnit.test('Canvas.markColor should be an enum with numbers.',
    function() {
      QUnit.strictEqual(Canvas.markColor.RED, 0, 'RED should be 0.');
      QUnit.strictEqual(Canvas.markColor.GREEN, 1, 'GREEN should be 1.');
      QUnit.strictEqual(Canvas.markColor.BLUE, 2, 'BLUE should be 2.');
  });
  QUnit.test('Canvas should accept data.', function() {
    var expectedData, canvas, receivedData;
    expectedData = {foo:'bar'};
    canvas = new Canvas(expectedData);
    receivedData = canvas.rawData();
    QUnit.strictEqual(receivedData.foo, expectedData.foo,
      'Should have returned the data it was given.');
  });
  QUnit.test('Canvas should have a canvasData method.', function() {
    QUnit.ok(_.isFunction(canvas.canvasData),
      'Should have a canvasData method.');
  });
  QUnit.test('Canvas should create data if not given any.', function() {
    QUnit.ok(_.isArray(canvas.canvasData()), 'Should have created data.');
  });
  QUnit.test('Canvas should create data with max rows and columns.',
    function() {
      var rows, columns, data;
      rows = columns = 0;
      data = canvas.canvasData();
      _.each(data, function(row) {
        rows += 1;
        if (!_.isArray(row)) {
          return;
        }
        _.each(row, function(column) {
          columns += 1;
        });
      });
      QUnit.strictEqual(rows, Canvas.CANVAS_HEIGHT,
        'Should have created rows equal to height.');
      QUnit.strictEqual(columns,
        Canvas.CANVAS_WIDTH * Canvas.CANVAS_HEIGHT,
        'Should have created rows equal to width.');
  });
  QUnit.test('Canvas should create data with all 0 defaults.', function() {
    var data, good;
    good = true;
    data = canvas.canvasData();
    _.each(data, function(row) {
      if (!good) {
        return;
      }
      _.each(row, function(column) {
        if (!good) {
          return;
        }
        if (column.t !== Canvas.markType.NONE) {
          good = false;
        }
        if (column.s !== Canvas.markSize.SMALL) {
          good = false;
        }
        if (column.c !== Canvas.markColor.RED) {
          good = false;
        }
      });
    });
    QUnit.strictEqual(good, true,
      'Created data should have been set to defaults.');
  });
  QUnit.test('Canvas should create data with null for a name.', function() {
    QUnit.ok(_.isNull(canvas.name()),
      'Should have a name method that returns null.');
  });
  QUnit.test('Canvas should create data with null for a password.',
    function() {
      QUnit.ok(_.isNull(canvas.password()),
        'Should have a password method that returns null.');
  });
  QUnit.test('Canvas should create data with 0 votes.', function() {
    QUnit.strictEqual(canvas.votes(), 0,
      'Should have a votes method that returns 0.');
  });
  QUnit.test('Canvas should create data with a date.', function() {
    QUnit.ok(canvas.when() instanceof Date,
      'Should have a when method that returns a date.');
  });
  QUnit.test('Canvas.validOptions should be a function.', function() {
    QUnit.ok(_.isFunction(Canvas.validOptions),
      'validOptions should be a static method.');
  });
  QUnit.test('validOptions should fail with any invalid data.', function() {
    var testedData, good;
    good = true;
    testedData = [
      [3, 3, 3],
      [0, 3, 3],
      [3, 0, 3],
      [-1, 0, 2]
    ];
    _.each(testedData, function(data) {
      if (!good) {
        return;
      }
      good = !Canvas.validOptions.apply(null, data);
    });
    QUnit.strictEqual(good, true, 'Should have failed for every attempt.');
  });
  QUnit.test('validOptions should pass with valid data.', function() {
    var testedData, good;
    good = true;
    testedData = [
      [0, 0, 0],
      [0, 1, 2],
      [2, 1, 0],
      [1, 0, 2]
    ];
    _.each(testedData, function(data) {
      if (!good) {
        return;
      }
      good = Canvas.validOptions.apply(null, data);
    });
    QUnit.strictEqual(good, true, 'Should have passed at every attempt.');
  });
  QUnit.test('getDataAt should return data for valid x, y.', function() {
    var data;
    data = canvas.getDataAt(Canvas.CANVAS_WIDTH-1,
      Canvas.CANVAS_HEIGHT-1);
    QUnit.strictEqual(data.t, Canvas.markType.NONE,
      'type should be default value.');
    QUnit.strictEqual(data.s, Canvas.markSize.SMALL,
      'size should be default value.');
    QUnit.strictEqual(data.c, Canvas.markColor.RED,
      'color should be default value.');
  });
  QUnit.test('getDataAt should return null for invalid x, y.', function() {
    QUnit.ok(_.isNull(canvas.getDataAt(1000, 999)),
      'Should have returned null.');
  });
  QUnit.test('setDataAt should set the data.', function() {
    var data;
    canvas.setDataAt(2, 2, Canvas.markType.CIRCLE, Canvas.markSize.LARGE,
      Canvas.markColor.BLUE);
    data = canvas.getDataAt(2, 2);
    QUnit.strictEqual(data.t, Canvas.markType.CIRCLE,
      'type should have been set to circle.');
    QUnit.strictEqual(data.s, Canvas.markSize.LARGE,
      'size should have been set to large.');
    QUnit.strictEqual(data.c, Canvas.markColor.BLUE,
      'color should have been set to blue.');
  });
  QUnit.test(
    'setDataAt should not set any data when any invalid data is given.',
    function() {
      var data;
      canvas.setDataAt(23, 101, Canvas.markType.CIRCLE, 30,
        Canvas.markColor.BLUE);
      data = canvas.getDataAt(23, 101);
    QUnit.strictEqual(data.t, Canvas.markType.NONE,
      'type should still be none.');
    QUnit.strictEqual(data.s, Canvas.markSize.SMALL,
      'size should still be small.');
    QUnit.strictEqual(data.c, Canvas.markColor.RED,
      'color should still be red.');
  });
  QUnit.test('updateData should set data.', function() {
    var data;
    canvas.updateData({foo: 'bar'});
    data = canvas.rawData();
    QUnit.strictEqual(data.foo, 'bar',
      'Data should have been added.');
    QUnit.ok(_.isUndefined(data.graph),
      'Old data should have been overwritten.');
  });
  QUnit.test('canvasData should be reactive.', function() {
    var data;
    Meteor.createMockContext();
    data = canvas.canvasData();
    canvas.setDataAt(3, 3, 1, 2, 2);
    QUnit.ok(Meteor.deps.Context.current.invalidateSpy.calledOnce,
      'Setting new data should have invalidated context.');
    Meteor.clearMockContext();
  });
  QUnit.test('canvasData should not react on invalid data.', function() {
    var data;
    Meteor.createMockContext();
    data = canvas.canvasData();
    canvas.setDataAt(3, 3, 1, 2, 4);
    QUnit.ok(!Meteor.deps.Context.current.invalidateSpy.called,
      'Setting invalid data should not have invalidated context.');
    Meteor.clearMockContext();
  });
  QUnit.test('getDataAt should be reactive.', function() {
    var data;
    Meteor.createMockContext();
    data = canvas.getDataAt(3, 5);
    canvas.setDataAt(3, 3, 1, 2, 2);
    QUnit.ok(Meteor.deps.Context.current.invalidateSpy.calledOnce,
      'Setting new data should have invalidated context.');
    Meteor.clearMockContext();
  });
});

