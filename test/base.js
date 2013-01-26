(function() {
  var Parent;
  QUnit.module('sp.base', {
    setup: function() {
      /**
       * @param {string=} opt_foo
       * @constructor
       */
      Parent = function(opt_foo) {
        this.bar = opt_foo;
        this.givenArg = 'blah';
      };
      /**
       * @return {string=}
       */
      Parent.prototype.foo = function() {
        return this.bar;
      };
      /**
       * @param {string} arg
       */
      Parent.prototype.setFoo = function(arg) {
        this.givenArg = arg;
      };
    },
    teardown: function() {
    }
  });
  QUnit.test('sp.base should exist', function() {
    QUnit.ok(sp.base, 'sp.base should exist.');
  });
  QUnit.test('sp.base.global should be a reference to the global scope.',
    function() {
      QUnit.strictEqual(sp.base.global, window,
        'Should reference the global scope.');
  });
  QUnit.test('sp.base.noop is a function.', function() {
    QUnit.ok(_.isFunction(sp.base.noop), 'Should be a function.');
  });
  QUnit.test('sp.base.inherits adds a reference to parent on the child.',
    function() {
      function Child() {}
      sp.base.inherits(Child, Parent);
      QUnit.strictEqual(Child.parent_, Parent,
        'Should add a reference to parent.');
  });
  QUnit.test('sp.base.inherits adds parent\'s prototype to a child.',
    function() {
      var child;
      function Child() {}
      sp.base.inherits(Child, Parent);
      child = new Child();
      QUnit.ok(_.isFunction(child.foo), 'Should have added foo to child.');
  });
  QUnit.test(
    'sp.base.inherits replaces reference to the constructor to be child',
    function() {
      var child;
      function Child() {}
      sp.base.inherits(Child, Parent);
      child = new Child();
      QUnit.strictEqual(child.constructor, Child,
        'Should have replaced child constructor with Child.');
  });
  QUnit.test('sp.base.parent should be able to call a constructor properly.',
    function() {
      var child;
      Parent = sinon.spy(Parent);
      function Child() {
        this.parent(this);
      }
      sp.base.inherits(Child, Parent);
      child = new Child();
      QUnit.ok(Parent.calledOnce, 'Should have called parent.');
  });
  QUnit.test('sp.base.parent passes in arguments to a constructor.',
    function() {
      var expected, child;
      expected = 'foobartest123';
      /**
       * @param {string} foo
       * @constructor
       */
      function Child(foo) {
        this.parent(this, arguments);
      }
      sp.base.inherits(Child, Parent);
      child = new Child(expected);
      QUnit.strictEqual(child.bar, expected,
        'Should have passed in the argument to the parent constructor.');
  });
  QUnit.test('sp.base.parent calls a method of a parent properly.',
    function() {
      var expected, child;
      expected = 'foobartest123';
      /**
       * @param {string} foo
       * @constructor
       */
      function Child(foo) {
        this.parent(this, arguments);
      }
      sp.base.inherits(Child, Parent);
      Child.prototype.foo = function() {
        return this.parent('foo');
      };
      child = new Child(expected);
      QUnit.strictEqual(child.foo(), expected,
        'Should have called the parent\'s method.');
  });
  QUnit.test('sp.base.parent passes in arguments to methods of parent.',
    function() {
      var expected, child;
      expected = 'foobartest123';
      /**
       * @param {string} foo
       * @constructor
       */
      function Child(foo) {
        this.parent(this, arguments);
      }
      sp.base.inherits(Child, Parent);
      /** @inheritDoc */
      Child.prototype.setFoo = function(arg) {
        return this.parent('setFoo', arguments);
      };
      child = new Child('blahfoo');
      child.setFoo(expected);
      QUnit.strictEqual(child.givenArg, expected,
        'Should have called the parent\'s method with argument.');
  });
}());

