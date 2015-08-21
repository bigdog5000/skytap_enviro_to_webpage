module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        'jshintrc': true
      },
      lib: {        
        src: [ 'lib/**/*.js' ]
      },
      test: {        
        src: [ 'test/**/*.js' ]     
      }
    },
    mochaTest: {
      src: [ 'test/**/*.js' ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('validate', [ 'jshint', 'mochaTest' ]);
}