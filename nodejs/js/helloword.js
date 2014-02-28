console.log('hello world');

var test = {
    a1: function(){
        console.log('bc');
    },
    bindHandler: function(){

    }
};
//init
test.a1();









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




