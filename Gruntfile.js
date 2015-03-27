module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-mocha-test');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mocha: {
            test: {
                src: ['test/**/*.js']
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'mochawesome',
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['test/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha');
};
