/**
 * @author wisteria
 * description doxco：markdown方式写js文档注释
 */

console.log('hello world');



(function() {

});

/**
 * 从输入文件中通过dox解析，然后渲染到页面中
 * Example:
 * ```js
 * doxco.run('lib/doxco.js', './doc');
 * console.log('aaa');
 * ```
 * @param {String} input 输入文件地址
 * @param {String} outputDir 输出目录地址
 * @param {String} skin 皮肤
 */
var test = {
    a1: function() {
        console.log('bc');
    },
    bindHandler: function() {

    }
};
//init
test.a1();

/**
 * [testa description]
 * #this is an h1
 *
 * ###this is an h2
 *
 * ```css
 * body{color:red;}
 * -文本1
 * -文办2
 * ```
 * >这是一个标题
 * +a
 * +b
 * +c
 * *single asterisks*
 * **double asterisks**
 
 */


function test(sw, sh) {

}
/**
 *
 * - Use the `printf()` function.
 * - ``There is a literal backtick (`) here.``
 * - a2
 *
 * ```css
 * body{color:red;}
 * ```
 */


/*

Node.js特点：事件驱动、异步编程。
Node.js性能不错。它以单进程、单线程模式运行，和Javascript的运行方式一致。

*/

//闭包特性
/*var hostRequest = http.request(requestOptions, function(response) {
    var responseHTML = '';
    response.on('data', function(chunk){
        responseHTML responseHTML + chunk;
    });
    response.on('end', function(){
        console.log(responseHTML);
        //your code
    });
});*/