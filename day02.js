'use strict';

let fs = require('fs');

let data = fs.readFileSync('./data/day02.txt', 'utf8');
data = data.toString().split('\r\n');

module.exports = {
    parts: [ 
        function()  {
            let matcheCounts = ['2', '3'].map((repeatCheck) => {
                return data.filter((id) => {
                    let text = id.split('').sort().join('');
                    let match = null;
                    let rePattern =/([a-zA-Z]).*(\1)/g;
                    while (match = rePattern.exec(text)) {
                        if (match[0].length == repeatCheck) {
                            return true;
                        }
                    }

                    return false;
                });
            });

            return matcheCounts[0].length * matcheCounts[1].length; //7688
        },
        function() {

            return Array.from(Array(data[0].length).keys())
                .map(function(value) {
                    var counts = {};
                    data.map((id) => {
                        return id.slice(0, value) + id.slice(value+1);
                    })
                    .sort()
                    .forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
                    
                    let res = Object.keys(counts).filter((key) => {
                        return (counts[key] > 1) ? true : false;
                    });

                    return res;
                })
                .reduce((item, current) => {
                    return item + current;
                });
        }]    
}

