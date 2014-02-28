module.exports = function(grunt){

    // 1.所有配置文件
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // 2. 插件的配置项
        less: {
            development: {
                options: {
                    paths: ['css'],
                    compress: true,
                    yuicompress: true,
                    sourceMap: true
                    // sourceMapBasepath: 'css/less',
                    // outputSourceFiles: true
                    // sourceMapFilename: '*.css.map'
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
                    sourceMap: false
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



            // //编译
            // compile: {
            //     files: {
            //         'css/main.css': 'css/less/main.less'
            //     },
            // },
            // yuicompress: {
            //     files: {
            //         'css/main.min.css': 'css/main.css'
            //     },
            //     options: {
            //         compress: true,
            //         yuicompress: true
            //     }
            // }
        },
        watch: {
            script: {
                files: ['css/less/*.less'],
                tasks: ['less:development']
            }
        }
    });

    // 3.加载使用的插件
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4.默认任务
    grunt.registerTask('default', ['less:development','watch']);
}