/* lesson1 */
// console.log('beep boop');

/* lesson2 */
/*var fs = require('fs');
fs.createReadStream(process.argv[2]).pipe(process.stdout);*/

/* lesson3 */
// process.stdin.pipe(process.stdout);

/* lesson4 */
/*var through = require('through');
var tr = through(function(buf){
    this.queue(buf.toString().toUpperCase());
});
process.stdin.pipe(tr).pipe(process.stdout);
// tr.end();

// function write (buf) {
//     var str = buf.toString().replace('\n','').toUpperCase();
//     console.log(str);
// }*/

/* lesson5 */
/*var split = require('split');
var through = require('through');
var count = 0;
var str = '';
process.stdin
        .pipe(split())
        .pipe(through(function(line){
            count ++;
            if(count%2){
                str = line.toString().toLowerCase();
            }else{
                str = line.toString().toUpperCase();
            }
            console.log(str);
        }))
        .pipe(process.stdout);
*/

/* lesson6 */
/*var concat = require('concat-stream');
process.stdin
        .pipe(concat(function(buf){
            var str = buf.toString().split('').reverse().join('');
            console.log(str);
        }));
*/

/* lesson7 */
/*var through = require('through');
var http = require('http');

var server = http.createServer(function(req, res){
    if(req.method === 'POST'){
        function write(buf){
            this.queue(buf.toString().toUpperCase());
        }
        req.pipe(through(write)).pipe(res);
    }else{
        res.end();
    }
});
server.listen(process.argv[2]);*/

/* lesson8 */
/*var request = require('request');
var r = request.post('http://localhost:8000');
process.stdin.pipe(r);
r.pipe(process.stdout);*/

/* lesson9 */
/*var ws = require('websocket-stream');
var stream = ws('ws://localhost:8000');
stream.end('hello\n');*/

/* lesson10 */
/*var through = require('through');
var trumpet = require('trumpet');
var tr = trumpet();

// tr.selectAll('.loud', function(elem){
//     var stream = elem.createStream();
//     stream.on('data', function(innerHTML){
//         stream.write(innerHTML.toString().toUpperCase());
//     });
// });

var loud = tr.select('.loud').createStream();
load.pipe(through(function(buf){
    this.queue(buf.toString().toUpperCase());
}));

process.stdin.pipe(tr).pipe(process.stdout);*/

/* lesson11 */
/*var spawn = require('child_process').spawn;
var duplex = require('duplexer');

module.exports = function(cmd, args){
    var child = spawn(cmd, args);
    return duplex(child.stdin,child.stdout);
}*/

/* lesson12 */
var duplex = require('duplexer');
var through = require('through');
module.exports = function(counter){
    var counts = {};
    return duplex(through(record_count, set_count),counter);

    function record_count(obj){
        var country = obj.country;
        var count = counts[country] || 0;
        counts[country] = count + 1;
    }

    function set_count(){
        counter.setCounts(counts);
        counts = {};
    }
};