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
            dns.resolve4(req.headers.host,function(err,addresses){
                if(err){
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