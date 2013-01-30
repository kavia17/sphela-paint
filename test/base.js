define([
  'underscore',
  '../js/lib/base'
  ], function(_, base) {
  var Parent;
  QUnit.module('base', {
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
  QUnit.test('base should exist', function() {
    QUnit.ok(base, 'base should exist.');
  });
  QUnit.test('base.global should be a reference to the global scope.',
    function() {
      QUnit.strictEqual(base.global, window,
        'Should reference the global scope.');
  });
  QUnit.test('base.noop is a function.', function() {
    QUnit.ok(_.isFunction(base.noop), 'Should be a function.');
  });
  QUnit.test('base.inherits adds a reference to parent on the child.',
    function() {
      function Child() {}
      base.inherits(Child, Parent);
      QUnit.strictEqual(Child.parent_, Parent,
        'Should add a reference to parent.');
  });
  QUnit.test('base.inherits adds parent\'s prototype to a child.',
    function() {
      var child;
      function Child() {}
      base.inherits(Child, Parent);
      child = new Child();
      QUnit.ok(_.isFunction(child.foo), 'Should have added foo to child.');
  });
  QUnit.test(
    'base.inherits replaces reference to the constructor to be child',
    function() {
      var child;
      function Child() {}
      base.inherits(Child, Parent);
      child = new Child();
      QUnit.strictEqual(child.constructor, Child,
        'Should have replaced child constructor with Child.');
  });
  QUnit.test('base.parent should be able to call a constructor properly.',
    function() {
      var child, Parent_;
      Parent_ = sinon.spy(Parent);
      function Child() {
        Child.parent(this);
      }
      base.inherits(Child, Parent_);
      child = new Child();
      QUnit.ok(Parent_.calledOnce, 'Should have called parent.');
  });
  QUnit.test('base.parent passes in arguments to a constructor.',
    function() {
      var expected, child;
      expected = 'foobartest123';
      /**
       * @param {string} foo
       * @constructor
       */
      function Child(foo) {
        Child.parent(this, arguments);
      }
      base.inherits(Child, Parent);
      child = new Child(expected);
      QUnit.strictEqual(child.bar, expected,
        'Should have passed in the argument to the parent constructor.');
  });
  QUnit.test('base.parent calls a method of a parent properly.',
    function() {
      var expected, child;
      expected = 'foobartest123';
      /**
       * @param {string} foo
       * @constructor
       */
      function Child(foo) {
        Child.parent(this, arguments);
      }
      base.inherits(Child, Parent);
      Child.prototype.foo = function() {
        return Child.parent(this, 'foo');
      };
      child = new Child(expected);
      QUnit.strictEqual(child.foo(), expected,
        'Should have called the parent\'s method.');
  });
  QUnit.test('base.parent passes in arguments to methods of parent.',
    function() {
      var expected, child;
      expected = 'foobartest123';
      /**
       * @param {string} foo
       * @constructor
       */
      function Child(foo) {
        Child.parent(this, arguments);
      }
      base.inherits(Child, Parent);
      /** @inheritDoc */
      Child.prototype.setFoo = function(arg) {
        return Child.parent(this, 'setFoo', arguments);
      };
      child = new Child('blahfoo');
      child.setFoo(expected);
      QUnit.strictEqual(child.givenArg, expected,
        'Should have called the parent\'s method with argument.');
  });
  QUnit.test('base.parent works with multiplelevels of inheritance.',
    function() {
      var param, instance;
      function Child(foo) {
        Child.parent(this, arguments);
      }
      base.inherits(Child, Parent);
      function SubChild(foo) {
        SubChild.parent(this, arguments);
      }
      base.inherits(SubChild, Child);
      param = 'testsubchild';
      instance = new SubChild(param);
      QUnit.strictEqual(instance.foo(), param,
        'Subchild constructor inheritance should work.');
  });
  QUnit.test('Can call methods through multiple levels of inheritance.',
      function() {
      var param, instance;
      function Child(foo) {
        Child.parent(this, arguments);
      }
      base.inherits(Child, Parent);
      Child.prototype.setFoo = function(arg) {
        Child.parent(this, 'setFoo', arguments);
      };
      function SubChild(foo) {
        SubChild.parent(this, arguments);
      }
      base.inherits(SubChild, Child);
      SubChild.prototype.setFoo = function(arg) {
        Child.parent(this, 'setFoo', arguments);
      };
      param = 'testsubchild';
      instance = new SubChild('test');
      instance.setFoo(param);
      QUnit.strictEqual(instance.givenArg, param,
        'Subchild method inheritance should work.');
  });
  QUnit.test('Call to inherited methods from multiple levels down.',
    function() {
      var param, instance;
      function Child(foo) {
        Child.parent(this, arguments);
      }
      base.inherits(Child, Parent);
      function SubChild(foo) {
        SubChild.parent(this, arguments);
      }
      base.inherits(SubChild, Child);
      SubChild.prototype.setFoo = function(arg) {
        Child.parent(this, 'setFoo', arguments);
      };
      param = 'testsubchildfoo';
      instance = new SubChild('test');
      instance.setFoo(param);
      QUnit.strictEqual(instance.givenArg, param,
        'Subchild method inheritance should work though Child had no setFoo.');
  });
  QUnit.test('Call to non-existing method should throw an error.',
    function() {
      var instance;
      function Child(foo) {
        Child.parent(this, arguments);
      }
      base.inherits(Child, Parent);
      function SubChild(foo) {
        SubChild.parent(this, arguments);
      }
      base.inherits(SubChild, Child);
      SubChild.prototype.setNoFoo = function(arg) {
        Child.parent(this, 'setNoFoo', arguments);
      };
      instance = new SubChild('test');
      QUnit.throws(function() {
        instance.setNoFoo(param);
      }, 'Calling non-existing inherited method should throw an error.');
  });
});

