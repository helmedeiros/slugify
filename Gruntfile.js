module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: { jshintrc: '.jshintrc' },
      all: ['lib/**/*.js', 'test/**/*.js', 'Gruntfile.js']
    },
    jasmine_node: {
      options: { specFolders: ['test'] },
      all: []
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.registerTask('test', ['jasmine_node']);
  grunt.registerTask('default', ['jshint', 'test']);
};
