/*
 * jQuery File Upload Gruntfile
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*global module */

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'js/cors/*.js',
                'js/*.js',
                'server/node/server.js',
                'test/test.js'
            ]
        },
        concat: {//文件合并
            dist: {
                src: ['js/vendor/jquery.ui.widget.js',
                      'js/cdn/load-image.all.min.js', 
                      'js/cdn/canvas-to-blob.min.js', 
                      'js/jquery.fileupload.js', 
                      'js/jquery.fileupload-process.js', 
                      'js/jquery.fileupload-image.js'],
                      
                dest: 'dist/fileUpload.js'
            }
        },
        uglify: {//js文件压缩
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: '*.js',
                    dest: 'dist',
                    ext: '.min.js'
                }]
            }
        },
        watch: {
            options: {
                livereload: 1337
            },
            src: {
                files: ['css/*.css', '*.html']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bump-build-git');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //task
    grunt.registerTask('test', ['watch']);
    grunt.registerTask('default', ['concat','uglify','watch']);

};
