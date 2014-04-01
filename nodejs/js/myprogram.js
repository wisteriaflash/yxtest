/* lesson1 */
// console.log("HELLO WORLD");

/* lesson2 */
// console.log(process.argv);
//sum
/*var arr = process.argv;
var sum = 0;
for(var i=2,len=arr.length; i<len; i++){
    sum += Number(arr[i]);
}
console.log(sum);*/

/* lesson3 */
/*var fileName = process.argv[2];
var fs = require('fs');
var buf = fs.readFileSync(fileName);
var num = buf.toString().split('\n').length-1;
console.log(num);
*/

/* lesson4 */
/*var fileName = process.argv[2];
var fs = require('fs');
fs.readFile(fileName,'utf-8', function(err,data){
    if(err){
        console.log('err');
        return;
    }
    var num = data.split('\n').length-1;
    console.log(num);    
});*/

/* lesson5 */
/*var fileDir = process.argv[2];
var fs = require('fs');
var regex = new RegExp('\.'+process.argv[3]+'');
fs.readdir(fileDir, function(err,list){
    if(err){
        console.log(err);
        return;
    }
    list.forEach(function(file){
        if(regex.test(file)){
            console.log(file);
        }
    });
});
//5-2
var fs = require('fs');
var path = require('path');
fs.readdir(process.argv[2], function(err,list){
    list.forEach(function(file){
        if(path.extname(file) === '.'+process.argv[3]){
            console.log(file);
        }
    });
});*/

/* lesson6 */
/*var mymodule = require('./mymodule.js');
mymodule(process.argv[2], process.argv[3], function(err,data){
    if(err){
        console.log(err);
        return;
    }
    data.forEach(function(file){
        console.log(file);
    });
});*/

/* lesson7 */
/*var http = require('http');
var url = process.argv[2];
http.get(url, function(res){
    // console.log(res.statusCode);
    res.on('data', function(data){
        console.log(data.toString());
    });

}).on('error', function(e){
    console.log('Got error:' +e.message);
});

//7-2
var http = require('http');
http.get(process.argv[2], function(res){
    res.setEncoding('utf-8');
    res.on('data',console.log);
    res.on('error',console.error);
});*/

/* lesson8 */
/*var http = require('http');
var bl = require('bl');
http.get(process.argv[2], function(res){
    res.pipe(bl(function(err, data){
        if(err){
            return console.error(err);
        }
        console.log(data.toString().length);
        console.log(data.toString());
    }));
});*/

/* lesson9 */
/*var http = require('http');
var bl = require('bl');
//
var urlArr = process.argv.slice(2,5);
var result = [];
function getData(url){
    http.get(url, function(res){
        res.pipe(bl(function(err, data){
            if(err){
                return console.error(err);
            }
            result.push(data.toString());
            checkUrl();
        }));
    });
}
function checkUrl(){
    if(urlArr.length == 0){
        result.forEach(function(data){
            console.log(data);
        })
        return;
    }
    var url = urlArr.shift();
    getData(url);
}
checkUrl();*/

/* lesson10 */
/*var net = require('net');
var server = net.createServer(function(socket){
    socket.end(nowTime()+'\n');
});
function zero(i){
    return (i<10 ? '0': '') +i;
}
function nowTime(){
    var date = new Date();
    var str = date.getFullYear() + '-' + zero(date.getMonth()+1) + '-' +zero(date.getDate())+
            ' ' + zero(date.getHours()) + ':' + zero(date.getMinutes());
    return str;
}
server.listen(process.argv[2]);*/

/* lesson11 */
