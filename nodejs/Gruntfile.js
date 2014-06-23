module.exports = function(grunt){

    // 1.所有配置文件
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/* <%= pkg.name %> -v<%= pkg.version %> -'+
                '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
        // 2. 插件的配置项
        less: {//less to css
            dev: {
                options: {
                    paths: ['css'],
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: 'css/less',
                    src: ['*.less', '!_*.less'],
                    dest: 'css/',
                    ext: '.css'
                }]
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
        // sprite:{//icon-sprite
        //     all: {
        //         src: 'img/icon/*.png',
        //         destImg: 'img/icon-spritesheet.png',
        //         destCSS: 'css/icon-sprites.css',
        //         algorithm: 'binary-tree'
        //     }
        //     //依赖支持：Graphics Magick，PhantomJS，并配置在path环境变量中
        // },
        // imagemin: {//图片优化
        //     dynamic: {
        //         files: [{
        //             expand: true,
        //             cwd: 'img/',
        //             src: ['**/*.{png,jpg,gif}'],
        //             dest: 'img/build/'
        //         }]
        //     }
        // },
        jshint: {//js语法检查
            files: ['js/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        concat: {//文件合并
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: ['js/*.js'],
                dest: 'js/production.js'
            }
        },
        uglify: {//js文件压缩
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'js',
                    src: '*.js',
                    dest: 'js/min',
                    ext: '.min.js'
                }]
            }
        },
        watch: {
            script: {
                files: ['css/less/*.less','<%= jshint.files %>'],
                // tasks: ['less:dev','']
                // tasks: ['less:dev','jshint']
            }
        }
    });

    // 3.加载使用的插件
    grunt.loadNpmTasks('grunt-contrib-less');
    //grunt.loadNpmTasks('grunt-spritesmith');
    // grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4.任务
    grunt.registerTask('default', ['less:dev','watch','jshint']);
    grunt.registerTask('product', ['less:production','uglify']);
}