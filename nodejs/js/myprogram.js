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