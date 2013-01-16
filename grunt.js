/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'paint/**/*.js', 'test/**/*.js']
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
        Meteor: false,
        console: false
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit');

};
