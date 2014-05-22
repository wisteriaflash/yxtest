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
        watch: {
            script: {
                files: ['css/less/*.less'],
                tasks: ['less:dev']
            }
        }
    });

    // 3.加载使用的插件
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 4.任务
    grunt.registerTask('default', ['less:dev','watch']);
    grunt.registerTask('product', ['less:production']);
}