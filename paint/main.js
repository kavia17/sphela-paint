
/**
 * almond 0.2.3 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);

                name = baseParts.concat(name.split("/"));

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (typeof callback === 'function') {

            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback.apply(defined[name], args);

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 15);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        config = cfg;
        return req;
    };

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("../almond", function(){});

define('meteor',[],function() {
  return Meteor;
});

/**
 * @fileOverview The canvas container is the main drawing area.
 */
define('lib/module/canvas_container/canvas_container',[
  ], function() {
  var ROUTER_PATH, container;
  /**
   * @type {string}
   * @const
   */
  ROUTER_PATH = '/canvas';
  /**
   * @type {Object}
   */
  container = {};
  /**
   * This module needs router access.
   */
  container.routed = true;
  if (Meteor.isClient) {
    (function() {
      /**
       * @param {Object} state
       * @param {string} canvasName
       */
      function stateHandler(state, canvasName) {
        console.log('canvas', canvasName);
      }
      container.stateHandler = _.bind(stateHandler, this);
      /**
       * @param {Route} route
       */
      function routeManager(route) {
        route.setHandler(container.stateHandler);
        return route;
      }
      container.routeManager = routeManager;
      function clientInit() {
      }
      container.clientInit = clientInit;
      function routerInit() {
        return [routeManager, ROUTER_PATH];
      }
      container.routerInit = routerInit;
    }());
  }
  if (Meteor.isServer) {
    (function() {
      function serverInit() {
      }
      container.serverInit = serverInit;
    }());
  }
  return container;
});

/**
 * @fileOverview The canvas browser is the way to find public canvases.
 */
define('lib/module/canvas_browser/canvas_browser',[
], function() {
  var ROUTER_PATH, browser;
  /**
   * @type {string}
   * @const
   */
  ROUTER_PATH = '/browser';
  /**
   * @type {Object}
   */
  browser = {};
  /**
   * This module needs router access.
   */
  browser.routed = true;
  if (Meteor.isClient) {
    (function() {
      /**
       * @param {Object} state
       * @param {string} page
       */
      function stateHandler(state, page) {
        console.log('browser', page);
      }
      /**
       * @param {Route} route
       */
      function routeManager(route) {
        route.setHandler(_.bind(stateHandler, this));
        return route;
      }
      function clientInit() {
      }
      browser.clientInit = clientInit;
      function routerInit() {
        return [routeManager, ROUTER_PATH];
      }
      browser.routerInit = routerInit;
    }());
  }
  if (Meteor.isServer) {
    (function() {
      function serverInit() {
      }
      browser.serverInit = serverInit;
    }());
  }
  return browser;
});

/**
 * @fileOverview Messages are a way to communicate with other players.
 */
define('lib/module/messages/messages',[
], function() {
  var ROUTER_PATH, messages;
  /**
   * @type {Object}
   */
  messages = {};
  if (Meteor.isClient) {
    (function() {
      function clientInit() {
        return null;
      }
      messages.clientInit = clientInit;
    }());
  }
  if (Meteor.isServer) {
    (function() {
      function serverInit() {
      }
      messages.serverInit = serverInit;
    }());
  }
  return messages;
});

/**
 * @fileOverview Side controls are used to manipulate the canvas in the canvas
 * container.
 */
define('lib/module/side_controls/side_controls',[
], function() {
  var controls;
  controls = {};
  /**
   * @type {Object}
   */
  if (Meteor.isClient) {
    (function() {
      function clientInit() {
        return null;
      }
      controls.clientInit = clientInit;
    }());
  }
  if (Meteor.isServer) {
    (function() {
      function serverInit() {
      }
      controls.serverInit = serverInit;
    }());
  }
  return controls;
});


/**
 * @fileOverview Main entry point for the client side.
 */
define('lib/client/main',[
],
function() {
  /**
   * @param {Array.<Function>} modules
   * @param {Function} Router
   */
  function main(modules, Router) {
    var r;
    r = new Router();
    _.each(modules, function(module) {
      module.clientInit();
      if (module.routed) {
        // Some things do not need router access.
        r.initModule.apply(r, module.routerInit());
      }
    });
    r.runRoute(Router.currentState());
  }
  return {
    main: main
  };
});

/**
 * @fileOverview Main entry point for the server side.
 */
define('lib/server/main',[
], function() {
  /**
   * @param {Array.<Function>} modules
   */
  function main(modules) {
    console.log('Started server app.');
  }
  return {
    main: main
  };
});

/**
 * @fileOverview A Route is a wrapper for managing push state. It's an interface
 * of sorts.
 */
define('lib/client/route',[
 ],function() {
  var Route;
  /**
   * @param {string} path
   * @param {RegExp=} opt_pathParser
   * @constructor
   */
  Route = function(path, opt_pathParser) {
    /**
     * @type {string}
     * @private
     */
    this.path_ = path;
    /**
     * @type {RegExp}
     * @private
     */
    this.parser_ = opt_pathParser || null;
  };
  /**
   * @type {Function}
   * @private
   */
  Route.prototype.stateHandler_ = null;
  /**
   * @param {Function} stateHandler
   */
  Route.prototype.setHandler = function(stateHandler) {
    this.stateHandler_ = stateHandler;
  };
  /**
   * @param {string} path
   * @param {Object} state
   */
  Route.prototype.run = function(path, state) {
    var result;
    if (!_.isFunction(this.stateHandler_)) {
      return;
    }
    if (this.parser_) {
      result = this.parser_.exec(path);
      if (result) {
        this.stateHandler_.apply(null, [state].concat(result.splice(1)));
        return;
      }
    }
    this.stateHandler_(state);
  };
  /**
   * @return {string}
   */
  Route.prototype.path = function() {
    return this.path_;
  };
  /**
   * @return {string}
   */
  Route.prototype.parser = function() {
    return this.parser_;
  };
  return Route;
});

/* global history:false */
/**
 * @fileOverview The router is the history push state manager.
 */
define('lib/client/router',[
  './route'
], function(Route) {
  /**
   * @constructor
   */
  function Router() {
    this.routes_ = {};
  }
  /**
   * Just a wrapper for history.state so as to avoid history references all over
   * the place.
   */
  Router.currentState = function() {
    return history.context;
  };
  /**
   * The default route.
   * @type {Route}
   */
  Router.prototype.defaultRoute_ = null;
  /**
   * @type {Object.<string,Route>}
   * @private
   */
  Router.prototype.routes_ = null;
  /**
   * @param {Route} route
   */
  Router.prototype.setDefaultRoute = function(route) {
    this.defaultRoute_ = route;
  };
  /**
   * @param {Function} routeManager A function that takes a Router and Routers
   * instances as arguments.
   * @param {string} routePath
   * @param {Regexp=} opt_pathParser A regular expression used to parse paths.
   * state's path arguments from the history state.
   */
  Router.prototype.initModule = function(routeManager, path, opt_pathParser) {
    //routeManager gets a reference to the router for pushState loveliness.
    this.routes_[path] = routeManager(new Route(path, opt_pathParser), this);
  };
  /**
   * Iterates through routes until it gets to a path that matches
   * the full path given.
   * @param {string} fullPath
   * @return {Route} The route.
   */
  Router.prototype.getRoute = function(fullPath) {
    return _.find(this.routes_, function(route, path) {
      if (fullPath.indexOf(path) === 0) {
        return true;
      }
      return false;
    }) || null;
  };
  /**
   * Run a router path manually.
   * @param {string=} opt_path
   * @param {Object=} opt_state
   */
  Router.prototype.runRoute = function(opt_path, opt_state) {
    var path, state, route;
    if (_.isUndefined(opt_state)) {
      state = {};
    } else {
      state = opt_state;
    }
    if (!_.isString(opt_path) || !opt_path.length) {
      route = this.defaultRoute_;
      path = '';
    } else {
      path = opt_path;
      route = this.getRoute(path);
    }
    if (!route) {
      return;
    }
    route.run(path, state);
  };
  return Router;
});

/**
 * @fileOverview The main entry point for client and server. As files are
 * loaded depth-first this is the last file to load. All files must begin with
 * meteor.startup to be able to see the sp namespace.
 */
/**
 * A safe reference to the global object.
 * @type {Object};
 */
var sp;
sp = {
  global: this
};
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

define("main", function(){});
