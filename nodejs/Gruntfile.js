module.exports = function(grunt){

    // 1.所有配置文件
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n'+
                '* node.js test proj'+
                '*/\n',
        // 2. 插件的配置项
        less: {
            dev: {
                options: {
                    paths: ['css'],
                    sourceMap: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'css/less',
                        src: ['*.less', '!_*.less'],
                        dest: 'css/',
                        ext: '.css'
                    }
                ]
            },
            production: {
                options: {
                    paths: ['css'],
                    cleancss: true,
                    compress: true,
                    yuicompress: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'css/less',
                        src: ['*.less', '!_*.less'],
                        dest: 'css/',
                        ext: '.css'
                    }
                ]
            }
        },
        jshint: {
            files: ['js/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        concat: {

        },
        // uglify: {
        //     options: {
        //         banner: '<%= banner %>'
        //     },
        //     dist: {
        //         files: {

        //         }
        //     }
        // },
        watch: {
            script: {
                files: ['css/less/*.less','<%= jshint.files %>'],
                tasks: ['less:dev','jshint']
            }
        }
    });

    // 3.加载使用的插件
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4.任务
    grunt.registerTask('default', ['less:dev','watch','jshint']);
    grunt.registerTask('product', ['less:production']);
}