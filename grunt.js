/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: [
        'js/**/!(extern)/*.js',
        'grunt.js',
        'test/**/*.js'
      ]
    },
    qunit: {
      all: ['http://localhost:8888/test/main.html']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        onevar: true,
        browser: true
      },
      globals: {
        sp: true,
        QUnit: false,
        _: false,
        sinon: false,
        Meteor: true,
        history: true,
        $: false,
        console: false,
        require: false,
        define: false,
        Template: false,
        requirejs: false
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: './js',
          optimize: 'none',
          out: 'paint/main.js',
          findNestedDependencies: true,
          name: '../almond',
          preserveLicenseComments: false,
          include: ['main'],
          paths: {
            underscore: '../extern/underscore',
            jquery: '../extern/jquery'
          },
          shim: {
            'underscore': {
              exports: '_'
            }
          }
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ['less'],
          yuicompress: false
        },
        files: {
          "paint/main.css": "less/app.less"
        }
      }
    }
  });

  // Default task.
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', 'lint less qunit requirejs');
  grunt.registerTask('build', 'requirejs');

};
