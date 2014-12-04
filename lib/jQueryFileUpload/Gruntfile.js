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
                src: ['js/*.js'],
                dest: 'dist/production.js'
            }
        },
        uglify: {//js文件压缩
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: 'production.js',
                    dest: 'dist',
                    ext: '.min.js'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bump-build-git');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //task
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['concat','uglify']);

};
