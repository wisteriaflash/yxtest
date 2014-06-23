/*
代理服务器
适用：本地一套环境，线上一套环境，本地没有的文件用线上的文件。

首先node-static和http建立了一个本地的http server，然后在当文件本地不存在时，使用dns模块和request模块，来进行反向代理线上资源。

dns模块可以根据host查找到线上地址的ip，然后使用request直接访问ip，伪造headers，来请求真实资源，资源拿到之后pipe到res中返回即可。
 */

var nodeStatic = require('node-static').Server;
var request = require("request");
var dns = require("dns");
var fileServer = new nodeStatic("./");
var http = require("http");

var httpServer = http.createServer(function(req, res) {
      req.addListener('end', function() {
        fileServer.serve(req, res, function(err, result) {
            if (err && (err.status === 404)) {
            //本地没有文件访问线上，透明server
            dns.resolve4(req.headers.host,function(err,addresses){//ipv4
                if(err){//dns解析失败时
                    res.writeHeader(200,'text/html');
                    res.write(req.url);
                    res.end(err);
                 }else{
                    var ip = addresses[0];
                    var p = 'http://'+ip+req.url;
                    req.headers['Host'] = req.headers.host;
                    request({
                        method:req.method,
                        url:p,
                        headers:req.headers
                    }).pipe(res);
                  } 
            });
            }
        });
    }).resume();
});

httpServer.listen(1314);