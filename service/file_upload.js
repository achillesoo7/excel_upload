const async = require('async');
const excelToJson = require('xlsx-to-json-lc');
const Script = require('../nanp-script');

exports.processFile = (file, columns) => {
    return new Promise((resolve, reject) => {
        excelToJson({
            input: file.path,
            output: null,
            lowerCaseHeaders: true
        }, (err, result) => {
            if (err) return reject(err);

            var fin = [];

           async.map(result, function(e,cb){
                if(e.hasOwnProperty('phone number')){
                    Script.readNumbers([e['phone number']]).then((res) => {
                        e.region = res[0];
                        fin.push(e);
                        cb();
                    }).catch((err) => {
                        cb(err);
                    });
                }
           }, function(err){
            console.log('Inside callback');
            if(err) reject(err);
            if(columns) columns = columns.split(',');
            var column_names_arr = [];
            for (key in fin[0]) {
                column_names_arr.push(key);
            }
            if(columns.length){
                for(var i = 0; i < columns.length; i++){
                    if(!column_names_arr.includes(columns[i])) columns.splice(i, (i+1)); 
                }
            }
            if(columns.length) column_names_arr = columns;
            var final = processExcel(column_names_arr, result);
            resolve(final);

           });

        });
    });
}


function processExcel(column_names_arr, result){
    var arr = [];
    arr.push(column_names_arr);
    for(var i =0; i < result.length; i++){
        var temp_arr = [];
        for(key of column_names_arr){
            temp_arr.push(result[i][key])
        }
        arr.push(temp_arr);
    }
    return arr;
}