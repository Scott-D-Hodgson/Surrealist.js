module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '// <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n' + '// https://www.nraboy.com\n'
            },
            build: {
                src: 'src/*.js',
                dest: 'dist/surrealistjs.min.js'
            }
        },
        jshint: {
            all: ['*.js']
        },
        clean: {
            js: ['*.min.js']
        },
        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: 'src/*.js', dest: 'dist/'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean', 'jshint', 'copy', 'uglify']);

};