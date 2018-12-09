'use strict';

let fs = require('fs');

let data = fs.readFileSync('./data/day05.txt', 'utf8');
data = data.toString();

module.exports = {
    parts: [ 
        function()  {
            return reactIt(data).length;
        },
        
        function() {
            return Math.min(...
                Array.from(Array(26).keys())
                .map((value)=> {
                    let filterData = data;

                    filterData = filterData.replace(new RegExp(String.fromCharCode(value+65), 'g'), '');
                    filterData = filterData.replace(new RegExp(String.fromCharCode(value+65+32), 'g'), '');
                
                    return reactIt(filterData).length;  
                })
            );
        }]    
}

let reactIt = function(data) {
    return data.split('').reduce((p, c) => Math.abs(p.charCodeAt(p.length-1) - c.charCodeAt(0)) == 32 ? p.substring(0, p.length-1) : p + c);
}

