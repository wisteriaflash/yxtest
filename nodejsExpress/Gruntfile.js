module.exports = function(grunt){

    // 1.所有配置文件
    grunt.initConfig({
    	kg: grunt.file.readJSON('package.json')
    	// 2. 插件的配置项
    });

    // 3.加载使用的插件
    grunt.loadNpmTasks('grunt-contrib-less');

    // 4.任务
    grunt.registerTask('default', ['watch']);
};