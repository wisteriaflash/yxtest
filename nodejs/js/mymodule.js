module.exports = function(dirName,filter,callback){
    var fs = require('fs');
    var path = require('path');
    fs.readdir(dirName, function(err,list){
        if(err){
            return callback(err);
        }
        var arr = [];
        list.forEach(function(file){
            if(path.extname(file) === '.'+filter){
                // console.log(file);
                arr.push(file);
            }
        });
        callback(null, arr);
    });
}