module.exports = function(grunt){

    // 1.所有配置文件
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // 2. 插件的配置项
        less: {
            development: {
                options: {
                    paths: ['css'],
                    sourceMap: true,
                    sourceMapBasepath: 'css/',
                    sourceMapFilename: 'css/main.css.map'
                },
                files: {
                    'css/main.css': 'css/less/main.less'
                }
            },
            production: {
                options: {
                    paths: ['css'],
                    cleancss: true,
                },
                files: {
                }
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
    grunt.registerTask('default', ['less','watch']);
}