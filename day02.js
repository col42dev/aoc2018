'use strict';

let fs = require('fs');

let data = fs.readFileSync('./data/day02.txt', 'utf8');
data = data.toString().split('\r\n');

module.exports = {
    parts: [ 
        function()  {
            let matcheCounts = ['2', '3'].map(repeatCheck => {
                return data.filter(id => {
                    let text = id.split('').sort().join('');
                    let match = null;
                    let rePattern = /([a-zA-Z]).*(\1)/g;
                    while (match = rePattern.exec(text)) {
                        if (match[0].length == repeatCheck) {
                            return true;
                        }
                    }

                    return false;
                });
            });

            return matcheCounts[0].length * matcheCounts[1].length;
        },
        function() {
            return Array.from(Array(data[0].length).keys())
                .map(value => {
                    var counts = {};
                    data.map(id => id.slice(0, value) + id.slice(value + 1))
                    .sort()
                    .forEach(x => counts[x] = (counts[x] || 0) + 1);
                    
                    return Object.keys(counts).filter(key => (counts[key] > 1) ? true : false);
                })
                .reduce((item, current) => item + current);
        }]    
}

