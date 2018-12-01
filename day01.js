'use strict';

let fs = require('fs');


let data = fs.readFileSync('./data/day01.txt', 'utf8');
data = data.toString().split('\r\n');

module.exports = {
    parts: [ 
        function() {
            return data.reduce((total, num) => parseInt(total) + parseInt(num));
        },
        function() {
            let accFreq = 0;
            const seen = {};
            while (true) {
                for (const num of data) {
                    accFreq += Number(num);

                    if (seen[accFreq]) {
                        return accFreq;
                    }

                    seen[accFreq] = true;
                }
            }

        }]    
}