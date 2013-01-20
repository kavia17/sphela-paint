/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: [
        'paint/**/!(extern)/*.js',
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
        sp: false,
        QUnit: false,
        _: false,
        sinon: false,
        Meteor: false,
        history: true,
        console: false
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit');

};
